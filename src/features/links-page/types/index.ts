import { z } from 'zod';

export const linkSchema = z.object({
  links: z.array(
    z.object({
      platform: z.string().min(1, 'Platform is required'),
      url: z.string().min(1, 'url is required'),
      id: z.string(),
      color: z.string().optional(),
    }),
  ),
});

export type FormData = z.infer<typeof linkSchema>;
