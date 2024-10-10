import { z } from 'zod';
import { BaseEntity } from '@/types';

export const calendarSchema = z.object({
  name: z
    .string()
    .max(200, "Name can't exceed 200 characters")
    .refine((value) => value.trim().length > 0, 'Name is required'),
  year: z
    .string()
    .max(4, "Year can't exceed 4 characters")
    .refine((value) => value.trim().length > 0, 'Year is required'),
  date: z.string().refine((value) => value.trim().length > 0, 'Date is required'),
  dayType: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean(),
});

export type CalendarData = z.infer<typeof calendarSchema> & {
  dayTypeName?: string;
  createdAt: Date;
} & BaseEntity;

export type CalendarDTO = {
  id: number;
  company: number;
  name: string;
  date: string;
  year: string;
  day_type?: string;
  day_type_name?: string;
  description?: string;
  is_active: boolean;
  created_at: Date;
};

export type CalendarProps = {
  data: CalendarData;
};
