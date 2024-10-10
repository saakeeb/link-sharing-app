import { BaseEntity } from '@/types';

export type Operation = {
  name: 'Create' | 'Read' | 'Update' | 'Delete' | 'All';
  allowed: boolean;
};

export type Permission = {
  name: string;
  read: string;
  allowRead: boolean;
  create: string;
  allowCreate: boolean;
  update: string;
  allowUpdate: boolean;
  delete: string;
  allowDelete: boolean;
  all: string;
  allowAll: boolean;
  createdAt: Date;
} & BaseEntity;
