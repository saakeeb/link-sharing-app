import { z } from 'zod';
import { BaseEntity } from '@/types';

export const roleSchema = z.object({
  code: z
    .string()
    .max(10, "Code can't exceed 10 characters")
    .refine((value) => value.trim().length > 0, 'Code is required'),
  name: z
    .string()
    .max(50, "Name can't exceed 50 characters")
    .refine((value) => value.trim().length > 0, 'Name is required'),
  description: z.string().max(500, "Description can't exceed 500 characters").optional(),
  isActive: z.boolean(),
});

export type Role = z.infer<typeof roleSchema> & {
  createdAt: Date;
} & BaseEntity;

export type RoleDTO = {
  id: number;
  company: number;
  name: string;
  code: string;
  description?: string;
  is_active: boolean;
  created_at: Date;
};

export type RoleProps = {
  data: Role;
};
