import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/shad/ui/input";
import useRegister from "../hooks/useRegister";

import RegisterFormSchemaType, { schema } from "../validationModels/register";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState<string | null | unknown>(null);
  const [submitSuccess, setSubmitSuccess] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<RegisterFormSchemaType> = async (data) => {
    const { firstName, lastName, password, email } = data;
    const file = data.picturePath[0];

    const formData = new FormData();
    formData.append("picturePath", file);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("password", password);
    formData.append("email", email);

    const { error, success } = await useRegister(formData);

    setSubmitError(error?.response?.data);
    if (success) {
      setSubmitSuccess(success);
      setTimeout(() => {
        navigate("/");
      }, 1000);
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
            <Input
              placeholder="FirstName"
              {...register("firstName")}
              className="text-black"
            />
            {errors.firstName && (
              <span className="text-red-800 block ml-2">
                {errors.firstName?.message}
              </span>
            )}
          </div>

          <div>
            <Input
              placeholder="LastName"
              {...register("lastName")}
              className="text-black"
            />
            {errors.lastName && (
              <span className="text-red-800 block ml-2">
                {errors.lastName?.message}
              </span>
            )}
          </div>
          <div>
            <Input
              placeholder="Email"
              {...register("email")}
              className="text-black"
            />
            {errors.email && (
              <span className="text-red-800 block ml-2">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div>
            <Input
              placeholder="Password"
              {...register("password")}
              className="text-black"
            />
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
              className="text-black"
            />
            {errors.confirmPassword && (
              <span className="text-red-800 block ml-2">
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>
          <div>
            <Input
              type="file"
              {...register("picturePath")}
              className="text-black/50"
            />
            {errors.picturePath && (
              <span className="text-red-800 block ml-2">
                {errors.picturePath.message?.toString()}
              </span>
            )}
          </div>
          {typeof submitError === "string" && submitError && (
            <p className="text-white/50 ml-2 block">{submitError}</p>
          )}
          {submitSuccess && (
            <p className=" text-white/50 ml-2">Registered Successfully</p>
          )}
          <div className="flex justify-end">
            <button
              className="bg-black border border-white text-white px-2 py-1 rounded-md"
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
