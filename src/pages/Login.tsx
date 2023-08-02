import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../@/components/shad/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginFormSchemaType, { schema } from "../validationModels/login";

const onSubmit: SubmitHandler<LoginFormSchemaType> = (data) => {
  console.log(data);
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchemaType>({ resolver: zodResolver(schema) });
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
              className="w-full"
              {...register("email")}
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
              className="w-full"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-800 block ml-2">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white p-2 rounded-md"
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
