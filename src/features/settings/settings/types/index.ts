import { z } from 'zod';

import { BaseEntity } from '@/types';

export const settingsSchema = z.object({
  dateFormat: z.string().optional(),
  dateTimeFormat: z.string().optional(),
  timeFormat: z.string().optional(),
  sortBy: z.string().optional(),
  decimalPlaces: z.string().max(1, "Decimal Places can't exceed 1 character").optional(),
  shortTermParkingTime: z.string().optional(),
});

export type Settings = z.infer<typeof settingsSchema> & BaseEntity;

export type SettingsDTO = {
  id: number;
  company: number;
  date_format?: string;
  date_time_format?: string;
  time_format?: string;
  order_by?: string;
  decimal_places?: string;
  short_term_parking_time?: string;
};

export type SettingsProps = {
  data: Settings;
};
