import * as z from "zod";

export const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(50, "Provide a valid Email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

type LoginFormSchemaType = z.infer<typeof schema>;

export default LoginFormSchemaType;
