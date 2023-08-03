import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../@/components/shad/ui/input";
import useRegister from "../hooks/useRegister";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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