import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../../@/components/shad/ui/input";
import useRegister from "../hooks/useRegister";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z
  .object({
    firstName: z
      .string()
      .min(1, "FirstName is required")
      .max(255, "Max limit 255"),
    lastName: z
      .string()
      .min(1, "lastName is required")
      .max(255, "max limit is 255"),
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email is requierd")
      .max(50, "Max is 50 limit"),
    password: z
      .string()
      .min(5, "Password should be atleat 5 ch long")
      .max(50, "Max limit is 50"),
    confirmPassword: z
      .string()
      .min(5, "Password should be atleat 5 ch long")
      .max(50, "Max limit is 50"),
    picturePath: z
      .any()
      .refine((file) => {
        if (file?.length > 0) return file[0].size < MAX_FILE_SIZE;
      }, `Max image size is 5MB.`)
      .refine((file) => {
        if (file?.length > 0)
          return ACCEPTED_IMAGE_TYPES.includes(file[0].type);
      }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormSchemaType = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState<string | null | unknown>(null);
  const [submitSuccess, setSubmitSuccess] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const { firstName, lastName, password, email } = data;
    const file = data.picturePath[0];

    const formData = new FormData();
    formData.append("picturePath", file);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("password", password);
    formData.append("email", email);

    const { error, success } = await useRegister(formData);

    // console.log(res?.data);
    setSubmitError(error?.response?.data);
    if (success) {
      setSubmitSuccess(success);
      navigate("/");
    }
  };

  return (
    <section id="Register" className="flex justify-center items-center">
      <div className="pt-[60px]">
        <h2 className="text-2xl font-black mb-4">Register</h2>
        <form
          className="flex flex-col gap-2 md:gap-5 w-[280px] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input placeholder="FirstName" {...register("firstName")} />
            {errors.firstName && (
              <span className="text-red-800 block ml-2">
                {errors.firstName?.message}
              </span>
            )}
          </div>
          <div>
            <Input placeholder="LastName" {...register("lastName")} />
            {errors.lastName && (
              <span className="text-red-800 block ml-2">
                {errors.lastName?.message}
              </span>
            )}
          </div>
          <div>
            <Input placeholder="Email" {...register("email")} />
            {errors.email && (
              <span className="text-red-800 block ml-2">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div>
            <Input placeholder="Password" {...register("password")} />
            {errors.password && (
              <span className="text-red-800 block ml-2">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div>
            <Input
              placeholder="ConfirmPassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-red-800 block ml-2">
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>
          <div>
            <Input type="file" {...register("picturePath")} />
            {errors.picturePath && (
              <span className="text-red-800 block ml-2">
                {errors.picturePath.message?.toString()}
              </span>
            )}
          </div>
          {typeof submitError === "string" && submitError && (
            <p className="text-red-800 ml-2 block">{submitError}</p>
          )}
          {submitSuccess && (
            <p className=" text-green-700 ml-2">Registered Successfully</p>
          )}
          <div className="flex justify-end">
            <button
              // type="submit"
              className="bg-black text-white p-2 rounded-md"
              // disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
