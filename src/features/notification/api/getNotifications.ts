import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Notification, NotificationDTO } from '../types';
import { messages } from 'react-querybuilder';

const PARKING_SLOT_URL = '/definition/notifications/';

export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const { data } = await axios.get<NotificationDTO[]>(PARKING_SLOT_URL);

    const notification = data.map((priceDto: NotificationDTO) => {
      const {
        id,
        company,
        is_read: isRead,
        recipient,
        recipient_name: recipientName,
        event,
        event_type: eventType,
        message,
        created_by_name: createdByName,
        created_at: createdAt,
      } = priceDto;

      return {
        id,
        company,
        isRead,
        recipient,
        recipientName,
        event,
        eventType,
        message,
        createdByName,
        createdAt,
      };
    });

    return notification;
  } catch (error) {
    console.error('Error occurred while fetching notification:', error);
    throw new Error('Failed to fetch notification');
  }
};

type QueryFnType = typeof getNotifications;

type UseNotificationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useNotifications = ({ config }: UseNotificationsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['notification'],
    queryFn: () => getNotifications(),
  });
};
