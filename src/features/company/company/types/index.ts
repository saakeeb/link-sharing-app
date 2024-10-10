import { z } from 'zod';
import { validatePhoneNumber, validateMobileNumber, validateEmail } from '@/utils/validation';

export const companySchema = z.object({
  name: z
    .string()
    .max(200, "Company name can't exceed 200 characters")
    .refine((value) => value.trim().length > 0, 'Company Name is required'),
  logo: z.custom<any>().optional(),
  email: z
    .string()
    .refine((value) => value.trim().length > 0, 'Email is required')
    .refine((value) => validateEmail(value), 'Invalid email'),
  url: z.string().optional(),
  address: z.string().optional(),
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
  country: z.string().max(100, "Country can't exceed 100 characters").optional(),
  city: z.string().max(100, "City name can't exceed 100 characters").optional(),
  state: z.string().max(100, "State name can't exceed 100 characters").optional(),
  language: z
    .string()
    .max(100, "Language name can't exceed 100 characters")
    .refine((value) => value.trim().length > 0, 'Language is required'),
  currency: z
    .string()
    .max(10, "Currency can't exceed 10 characters")
    .refine((value) => value.trim().length > 0, 'Currency is required'),
  slogan: z.string().optional(),
  isActive: z.boolean(),
});

export type Company = Omit<z.infer<typeof companySchema>, 'logo'> & {
  id: number;
  logo?: any;
  createdAt: Date;
};

export type CompanyDTO = {
  id: number;
  name: string;
  email: string;
  logo?: any;
  logo_path?: string;
  url?: string;
  address?: string;
  mobile_no: string;
  phone_no?: string;
  country?: string;
  city?: string;
  state?: string;
  language: string;
  currency: string;
  slogan?: string;
  is_active: boolean;
  created_at: Date;
};

export type CompanyProps = {
  data: Company;
};
