import { z } from "zod";

export const linkSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL")
    .refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return ["http:", "https:"].includes(parsed.protocol);
        } catch {
          return false;
        }
      },
      { message: "URL must start with http:// or https://" }
    ),
  slug: z
    .string()
    .min(1, "Slug is required")
    .min(3, "Slug must be at least 3 characters")
    .max(50, "Slug must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Slug can only contain letters, numbers, hyphens, and underscores"
    ),
  expires_at: z.date().optional(),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(100, "Password must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  allowUnauthenticated: z.boolean().optional().default(true),
});

export type LinkFormData = z.infer<typeof linkSchema>;
