import { z } from 'zod';
import { BaseEntity } from '@/types';

export const menuSchema = z.object({
  icon: z.custom<any>().optional(),
  name: z
    .string()
    .max(100, "Name can't exceed 100 characters")
    .refine((value) => value.trim().length > 0, 'Name is required'),
  languageKey: z
    .string()
    .max(200, "language key can't exceed 200 characters")
    .refine((value) => value.trim().length > 0, 'language key is required'),
  parent: z.string().optional(),
  code: z
    .string()
    .max(10, "Code can't exceed 10 characters")
    .refine((value) => value.trim().length > 0, 'Code is required'),
  contentType: z.string().optional(),
  route: z
    .string()
    .max(200, "Route path can't exceed 200 characters")
    .refine((value) => value.trim().length > 0, 'Route is required'),
  serialNo: z
    .string()
    .max(2, "Serial no can't exceed 2 characters")
    .refine((value) => value.trim().length > 0, 'Serial no is required'),
  isActive: z.boolean(),
});

export type Menu = Omit<z.infer<typeof menuSchema>, 'image'> & {
  parentName?: string;
  createdAt: Date;
} & BaseEntity;

export type MenuDTO = {
  id: number;
  company: number;
  name: string;
  icon?: any;
  icon_path?: any;
  language_key: string;
  parent?: string;
  parent_name?: string;
  code: string;
  content_type?: string;
  route_path: string;
  serial_no: string;
  is_active: boolean;
  created_at: Date;
};

export type parentDTO = {
  id: number;
  route_path: string;
  parent?: string | null;
};

export type MenuProps = {
  data: Menu;
};
