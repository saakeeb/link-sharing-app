import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Notification, NotificationDTO } from '../types';

const UPDATE_NOTIFICATION_URL = (id: number) => `/definition/notifications/${id}/`;

const updateNotification = async (notification: Notification): Promise<Notification> => {
  try {
    const notificationDto: NotificationDTO = {
      id: notification.id,
      company: notification.company,
      is_read: notification.isRead,
      recipient: notification.recipient,
      recipient_name: notification.recipientName,
      event: notification.event,
      event_type: notification.eventType,
      message: notification.message,
      created_by_name: notification.createdByName,
      created_at: notification.createdAt,
    };

    const { data } = await axios.patch<NotificationDTO>(
      UPDATE_NOTIFICATION_URL(notificationDto.id),
      notificationDto
    );

    const notificationData: Notification = {
      id: data.id,
      company: data.company,
      isRead: data.is_read,
      recipient: data.recipient,
      recipientName: data.recipient_name,
      event: data.event,
      eventType: data.event_type,
      message: data.message,
      createdByName: data.created_by_name,
      createdAt: data.created_at,
    };

    return notificationData;
  } catch (error) {
    console.error('Error occurred while updating notification:', error);
    throw new Error('Failed to update notification');
  }
};

type UseUpdateNotificationOptions = {
  config?: MutationConfig<typeof updateNotification>;
};

export const useUpdateNotification = ({ config }: UseUpdateNotificationOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating notification',
        message: error.message || 'There was an error attempting to update the notification.',
      });
    },
    ...config,
  });
};
