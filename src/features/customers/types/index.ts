import { z } from 'zod';

import { baseEntitySchema } from '@/types';

// Define the Customer schema
const customerSchema = z.object({
  customer_name: z.string(),
  contract_date: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
  expiry_date: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
  renew_date: z.union([
    z.string().refine((value) => !isNaN(Date.parse(value)), {
      message: 'Invalid date format',
    }),
    z.null(),
  ]),
  maintenance_frequency: z.string(), // You can further restrict this to specific values if needed
  invoice_time: z.string(),
  // invoice_time: z.enum([
  //   'At_Contract',
  //   'Before_Maintenance',
  //   'After_Maintenance',
  //   'EVERY_6_MONTHS',
  //   'EVERY_MONTH',
  // ]),
  contract_value: z.string(),
  city: z.string(),
  travel_time: z.string(),
});

// Merge the base entity schema with the customer schema
const extendedCustomerSchema = customerSchema.merge(baseEntitySchema);

export type Customer = z.infer<typeof extendedCustomerSchema>;

export { extendedCustomerSchema as customerSchema };
