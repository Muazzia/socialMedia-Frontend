import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const schema = z.object({
  description: z
    .string()
    .min(1, "Description is required")
    .max(255, "Max Limit is 255"),
  picturePath: z
    .any()
    .refine((file) => {
      if (file?.length > 0) return file[0].size < MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((file) => {
      if (file?.length > 0) return ACCEPTED_IMAGE_TYPES.includes(file[0].type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
});

type HomeSchemaForm = z.infer<typeof schema>;

export default HomeSchemaForm;
