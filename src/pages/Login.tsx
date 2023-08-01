import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../@/components/shad/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(50, "Provide a valid Email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

type FormSchemaType = z.infer<typeof schema>;

const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
  console.log(data);
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({ resolver: zodResolver(schema) });
  return (
    <section id="login" className="flex justify-center items-center">
      <div className="pt-[60px]">
        <h2 className="text-2xl font-black mb-4">Login</h2>
        <form
          className="flex flex-col gap-2 w-[280px] "
          onSubmit={handleSubmit(onSubmit)}
        >
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
