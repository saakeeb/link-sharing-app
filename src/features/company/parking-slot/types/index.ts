import { z } from 'zod';
import { BaseEntity } from '@/types';

export const parkingSlotSchema = z.object({
  space: z.number().positive(),
  disabilitySpace: z.number(),
  freeSpace: z.number(),
  totalSpace: z.number().positive(),
  disabilityOccupiedSpace: z.number(),
  freeOccupiedSpace: z.number(),
  totalOccupiedSpace: z.number(),
});

export type Slot = z.infer<typeof parkingSlotSchema> & BaseEntity;

export type SlotDTO = {
  id: number;
  company: number;
  space: number;
  disability_space: number;
  free_space: number;
  total_space: number;
  disability_occupied_space: number;
  free_occupied_space: number;
  total_occupied_space: number;
};

export type SlotProps = {
  data: Slot;
};
