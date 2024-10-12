import { z } from 'zod';

export const ProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  profileImage: z.custom<File>().optional(),
});

export type ProfileData = z.infer<typeof ProfileSchema>;
