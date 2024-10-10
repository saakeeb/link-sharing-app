import { z } from 'zod';
import { BaseEntity } from '@/types';

export const apiKeySchema = z.object({
  name: z.string(),
  isActive: z.boolean().optional(),
});

export type ApiKey = z.infer<typeof apiKeySchema> & {
  key?: string;
  createdAt: Date;
} & BaseEntity;

export type ApiKeyDTO = {
  id: number;
  company: number;
  name: string;
  key?: string;
  is_active?: boolean;
  created_at: Date;
};

export type ApiKeyProps = {
  data: ApiKey;
};
