import { z } from 'zod';

import { baseEntitySchema } from '@/types';

const maintenancePlanSchema = z.object({
  contract_id: z.number().nonnegative(),
  visit_no: z.number().nonnegative(),
  planned_date: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
  day_correction: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
});

// Merge the BaseEntity schema with the MaintenancePlan schema
const extendedMaintenancePlanSchema = maintenancePlanSchema.merge(baseEntitySchema);

export type MaintenancePlan = z.infer<typeof extendedMaintenancePlanSchema>;

export { extendedMaintenancePlanSchema as maintenancePlanSchema };
