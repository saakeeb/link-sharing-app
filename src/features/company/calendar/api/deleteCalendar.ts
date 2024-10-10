import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { CalendarData } from '../types';

const DELETE_CALENDAR_URL = (calendarId: number) => `/definition/calendars/${calendarId}/`;

const deleteCalendar = async ({ id }: CalendarData) => {
  try {
    await axios.delete(DELETE_CALENDAR_URL(id));
  } catch (error) {
    console.error('Error occurred while deleting calendar:', error);
    throw new Error('Failed to delete calendar');
  }
};

type UseDeleteCalendarOptions = {
  config?: MutationConfig<typeof deleteCalendar>;
};

export const useDeleteCalendar = ({ config }: UseDeleteCalendarOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: deleteCalendar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
      addNotification({
        type: 'success',
        title: 'Calendar has been deleted successfully',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error deleting calendar',
        message: error.message || 'There was an error attempting to delete the calendar.',
      });
    },
    ...config,
  });
};
