import { z } from 'zod';
import { BaseEntity } from '@/types';

export const shiftSchema = z.object({
  name: z
    .string()
    .max(50, "Name can't exceed 50 characters")
    .refine((value) => value.trim().length > 0, 'Name is required'),
  code: z
    .string()
    .max(10, "Code can't exceed 10 characters")
    .refine((value) => value.trim().length > 0, 'Code is required'),
  startTime: z.string().refine((value) => value.trim().length > 0, 'Start Time is required'),
  endTime: z.string().refine((value) => value.trim().length > 0, 'End Time is required'),
  isActive: z.boolean(),
});

export type Shift = z.infer<typeof shiftSchema> & {
  createdAt: Date;
} & BaseEntity;

export type ShiftDTO = {
  id: number;
  company: number;
  name: string;
  code: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: Date;
};

export type ShiftProps = {
  data: Shift;
};
