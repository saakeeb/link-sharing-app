import { z } from 'zod';

import { baseEntitySchema } from '@/types';

// Define the ContactSystem schema
const contactSystemSchema = z.object({
  contract_id: z.number(),
  system: z.string(),
  serial_no: z.string(),
});

// Merge the base entity schema with the contactSystem schema
const extendedContactSystemSchema = contactSystemSchema.merge(baseEntitySchema);

export type ContactSystem = z.infer<typeof extendedContactSystemSchema>;

export { extendedContactSystemSchema as contactSystemSchema };
