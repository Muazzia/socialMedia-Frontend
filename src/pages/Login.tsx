import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../@/components/shad/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginFormSchemaType, { schema } from "../validationModels/login";
import useLogin from "../hooks/useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchemaType>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null | unknown>(null);
  const [submitSuccess, setSubmitSuccess] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    console.log(data);
    const { res, error, success } = await useLogin(data);

    setSubmitError(error?.response?.data);
    if (success) {
      setSubmitSuccess(success);
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 1000);
    }
  };

  return (
    <section id="login" className="flex justify-center items-center">
      <div className="pt-[60px]">
        <h2 className="text-2xl font-black mb-4">Login</h2>
        <form
          className="flex flex-col gap-2 md:gap-5 w-[280px] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              placeholder="email"
              className="w-full text-black"
              {...register("email")}
              autoComplete="email"
            />
            {errors.email && (
              <span className="text-red-800 block ml-2">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div>
            <Input
              placeholder="password"
              className="w-full text-black"
              autoComplete="current-password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-800 block ml-2">
                {errors.password?.message}
              </span>
            )}
          </div>
          {typeof submitError === "string" && submitError && (
            <p className="text-red-800 ml-2 block">{submitError}</p>
          )}
          {submitSuccess && (
            <p className=" text-green-700 ml-2">LoggedIn Successfully</p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-600 border border-white text-white p-2 rounded-md"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
