import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/shad/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginFormSchemaType, { schema } from "../validationModels/login";
import useLogin from "../hooks/useLogin";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    const { error, success } = await useLogin(data);

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
              className="w-full h-10"
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
              className="w-full h-10"
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
          <div className="flex justify-end gap-2">
            <Link
              to={"/register"}
              className="bg-white border border-white hover:bg-black/60 hover:text-white text-black font-medium px-2 py-1 rounded-md"
            >
              Register
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gray-600 border border-white text-white px-2 py-1 rounded-md"
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
