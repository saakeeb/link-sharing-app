import { BaseEntity } from '@/types';

export type Notification = {
  id: number;
  company: number;
  isRead: boolean;
  recipient?: number;
  recipientName?: string;
  event: number;
  eventType: string;
  message: string;
  createdByName: string;
  createdAt: Date;
} & BaseEntity;

export type NotificationDTO = {
  id: number;
  company: number;
  is_read: boolean;
  recipient?: number;
  recipient_name?: string;
  event: number;
  event_type: string;
  message: string;
  created_by_name: string;
  created_at: Date;
};
