import { z } from 'zod';
import { validatePhoneNumber, validateMobileNumber, validateEmail } from '@/utils/validation';
import { BaseEntity } from '@/types';

const baseUserSchema = z.object({
  photo: z.custom<any>().optional(),
  firstName: z
    .string()
    .max(50, "First name can't exceed 50 characters")
    .refine((value) => value.trim().length > 0, 'First Name is required'),
  lastName: z.string().max(50, "First name can't exceed 50 characters").optional(),
  email: z
    .string()
    .min(1, 'Email is required')
    .refine((value) => validateEmail(value), 'Invalid email address'),
  bio: z.string().optional(),
  designation: z.string().max(100, "Designation can't exceed 100 characters").optional(),
  groups: z.string().refine((value) => value.trim().length > 0, 'Role is required'),
  gender: z.string().optional(),
  genderName: z.string().optional(),
  address: z.string().max(100, "Address can't exceed 100 characters").optional(),
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
  isActive: z.boolean().optional(),
});

export const addUserSchemaAdditionalProps = z.object({
  password: z.string().min(6, 'Password must contain 6  characters').optional(),
});

export const updateUserSchemaAdditionalProps = z.object({
  password: z.string().optional(),
});

export const addUserSchema = baseUserSchema.merge(addUserSchemaAdditionalProps);

export const updateUserSchema = baseUserSchema.merge(updateUserSchemaAdditionalProps);

export const userProfileSchemaAdditionalProps = z.object({
  organization: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  timeZone: z.string().optional(),
  language: z.string().optional(),
});

export const userProfileSchema = baseUserSchema.merge(userProfileSchemaAdditionalProps);

export type UserProfile = Omit<z.infer<typeof userProfileSchema>, 'image'> & {
  groups?: any;
} & BaseEntity;

export type User = Omit<z.infer<typeof addUserSchema>, 'image'> & {
  state?: string;
  city?: string;
  country?: string;
  countryName?: string;
  timeZone?: string;
  language?: string;
  languageName?: string;
  currencyName?: string;
  currencySymbol?: string;
  genderName?: string;
  designationTitle?: string;
  userGroups?: string[];
  groups?: any;
  isActive: boolean;
  createdAt: Date;
} & BaseEntity;

type UserExtended = {
  company: number;
  company_name?: string;
  photo?: any;
  photo_path?: any;
  bio?: string;
  designation?: string;
  designation_title?: string;
  gender?: string;
  gender_name?: string;
  organization?: string;
  mobile_no: string;
  phone_no?: string;
  country?: string;
  country_name?: string;
  currency_name?: string;
  currency_symbol?: string;
  state?: string;
  city?: string;
  address?: string;
  language?: string;
  language_name?: string;
  time_zone?: string;
};

export type UserGroup = {
  id: number;
  label: string;
  value: number;
};

export type UserDTO = {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
  password?: string;
  is_active: boolean;
  user_groups?: string[];
  groups: any;
  created_at: Date;
  userextended: UserExtended;
};

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Current password must contain at least 6 characters'),
    newPassword: z.string().min(6, 'New password must contain at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirmation password must contain at least 6 characters'),
  })
  .refine((schema) => schema.newPassword === schema.confirmPassword, {
    message: 'Make sure you re-typed password correctly',
    path: ['confirmPassword'],
  });

export type Password = z.infer<typeof passwordSchema>;

export type PasswordDTO = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export type TotalEarnings = {
  todayEarning?: number;
  todayTicketSold?: number;
  yesterdayEarning?: number;
  totalEarning?: number;
};

export type TotalEarningsDTO = {
  today_earning?: number;
  today_ticket_sold?: number;
  yesterday_earning?: number;
  total_earning?: number;
};

export type UserProps = {
  data: User;
};

export type UserProfileProps = {
  data: UserProfile;
};
