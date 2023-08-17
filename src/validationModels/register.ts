import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const schema = z
  .object({
    firstName: z
      .string()
      .min(3, "FirstName should be 3 Characters Long")
      .max(255, "Max limit 255"),
    lastName: z
      .string()
      .min(3, "lastName should be 3 Characters Long")
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

type RegisterFormSchemaType = z.infer<typeof schema>;

export default RegisterFormSchemaType;
