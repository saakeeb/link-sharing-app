import { z } from 'zod';
import { BaseEntity } from '@/types';
import { validateEmail } from '@/utils/validation';
import { validatePhoneNumber, validateMobileNumber } from '@/utils/validation';

export const branchSchema = z.object({
  name: z
    .string()
    .max(200, "Branch name can't exceed 200 characters")
    .refine((value) => value.trim().length > 0, 'Branch is required'),
  parent: z.string().optional(),
  status: z.string().optional(),
  email: z
    .string()
    .min(1, 'Email is required')
    .refine((value) => validateEmail(value), 'Invalid email address'),
  mobileNo: z
    .string()
    .min(1, 'Mobile no. is required.')
    .max(15, "Mobile no. can't exceed 15 characters")
    .refine((value) => validateMobileNumber(value), 'Invalid mobile no.'),
  phoneNo: z
    .string()
    .max(15, "Phone no. can't exceed 15 characters")
    .refine((value) => validatePhoneNumber(value), 'Invalid phone no.')
    .optional(),
  space: z.string().refine((value) => value.trim().length > 0, 'Space is required'),
  address: z.string().optional(),
  isActive: z.boolean(),
});

export type Branch = z.infer<typeof branchSchema> &
  BaseEntity & {
    parentName?: string;
    createdAt: Date;
  };

export type BranchDTO = {
  id: number;
  company: number;
  name: string;
  parent?: string;
  status?: string;
  parent_name?: string;
  email: string;
  mobile_no: string;
  phone_no?: string;
  space: string;
  address?: string;
  is_active: boolean;
  created_at: Date;
};

export type BranchProps = {
  data: Branch;
};
