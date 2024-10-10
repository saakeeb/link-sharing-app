import { z } from 'zod';

export const baseEntitySchema = z.object({
  id: z.number().nonnegative(),
  company: z.number().nonnegative(),
  uuid: z.string().uuid().optional(),
  created_at: z.string(),
  updated_at: z.string().optional(),
  is_deleted: z.boolean().optional(),
  created_by: z.number().optional(),
  updated_by: z.union([z.number(), z.null()]).optional(),
  // updated_by: z.number().optional(),
});

export type BaseEntity = {
  id: number;
  company: number;
  created_at?: Date;
  updated_at?: Date;
};

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio?: string;
  role?: 'SUPER_ADMIN' | 'ADMIN' | 'OWNER' | 'OPERATOR';
  photoUrl?: string;
  organization?: string;
  designation?: string;
  designationTitle?: string;
  mobileNo?: string;
  phoneNo?: string;
  user_groups?: string[];
  groups?: any;
  shift_name?: any;
  shift_start_time?: any;
  shift_end_time?: any;
  country?: string;
  countryName?: string;
  state?: string;
  city?: string;
  address?: string;
  language?: string;
  languageName?: string;
  timeZone?: string;
  gender?: string;
  genderName?: string;
  currencyName?: string;
  currencySymbol?: string;
  company: number;
  companyName?: string;
};

export type TableColumn<T> = {
  title: string;
  field: keyof T;
  Cell?: (props: { entry: T }) => JSX.Element;
};
