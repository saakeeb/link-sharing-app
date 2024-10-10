import { z } from 'zod';
import { BaseEntity } from '@/types';

export const AssignedShiftSchema = z.object({
  operator: z.string().refine((value) => value.trim().length > 0, 'Operator is required'),
  shift: z.string().refine((value) => value.trim().length > 0, 'Shift is required'),
  isActive: z.boolean(),
});

export type AssignedShift = z.infer<typeof AssignedShiftSchema> & {
  operatorName?: string;
  shiftName?: string;
  firstName?: string;
  lastName?: string;
  startTime?: string;
  endTime?: string;
  createdAt: Date;
} & BaseEntity;

export type AssignedShiftDTO = {
  id: number;
  company: number;
  user: string;
  shift: string;
  first_name?: string;
  last_name?: string;
  shift_name?: string;
  shift_start_time?: string;
  shift_end_time?: string;
  is_active: boolean;
  created_at: Date;
};

export type AssignedShiftProps = {
  data: AssignedShift;
};
