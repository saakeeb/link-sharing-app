import { z } from 'zod';

import { baseEntitySchema } from '@/types';

// Define the ServiceCall schema
const serviceCallSchema = z.object({
  contract_id: z.number().nonnegative(),
  request_time: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
  response_time: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
  arrival_time: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
  resolve_time: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
  receiver: z.string(),
  system: z.string(),
  serial_no: z.string(),
  complain: z.string(),
  call_class: z.string(),
  intervention: z.string(),
  section: z.string(),
  request: z.string(),
  root_cause: z.string(),
  status: z.string(),
  related_call: z.union([z.string(), z.null()]).optional(),
  customer_feedback: z.string().optional(),
  notes: z.union([z.string(), z.null()]).optional(),
});

// Merge the base entity schema with the service call schema
const extendedServiceCallSchema = serviceCallSchema.merge(baseEntitySchema);

export type ServiceCall = z.infer<typeof extendedServiceCallSchema>;

export { extendedServiceCallSchema as serviceCallSchema };
