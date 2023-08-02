import * as z from "zod";

export const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(50, "Provide a valid Email")
    .email("Email format is Invalid"),
  password: z.string().min(5, "Password is Invalid"),
});

type LoginFormSchemaType = z.infer<typeof schema>;

export default LoginFormSchemaType;
