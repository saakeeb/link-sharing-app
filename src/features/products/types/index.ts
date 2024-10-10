import { z } from 'zod';

import { baseEntitySchema } from '@/types';

// Define the Product schema
const productSchema = z.object({
  name: z.string(),
  maintenance_time: z.string(),
});

// Merge the base entity schema with the product schema
const extendedProductSchema = productSchema.merge(baseEntitySchema);

export type Product = z.infer<typeof extendedProductSchema>;

export { extendedProductSchema as productSchema };
