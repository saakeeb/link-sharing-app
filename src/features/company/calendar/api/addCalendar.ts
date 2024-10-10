import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { CalendarData, CalendarDTO } from '../types';

const ADD_CALENDAR_URL = '/definition/calendars/';

const addCalendars = async (calendar: CalendarData): Promise<CalendarData> => {
  try {
    const CalendarDto: CalendarDTO = {
      id: calendar.id,
      company: calendar.company,
      name: calendar.name,
      year: calendar.year,
      date: calendar.date,
      day_type: calendar.dayType,
      description: calendar.description,
      is_active: calendar.isActive,
      created_at: calendar.createdAt,
    };

    const { data } = await axios.post<CalendarDTO>(ADD_CALENDAR_URL, CalendarDto);

    const CalendarData: CalendarData = {
      id: data.id,
      company: data.company,
      year: data.year,
      name: data.name,
      date: data.date,
      dayType: data.day_type,
      description: data.description,
      isActive: data.is_active,
      createdAt: data.created_at,
    };

    return CalendarData;
  } catch (error) {
    console.error('Error occurred while adding Calendar:', error);
    throw new Error('Failed to add Calendar');
  }
};

type UseAddCalendarOptions = {
  config?: MutationConfig<typeof addCalendars>;
};

export const useAddCalendar = ({ config }: UseAddCalendarOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: addCalendars,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
      addNotification({
        type: 'success',
        title: 'Calendar has been added successfully.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error adding Calendar',
        message: error.message || 'There was an error attempting to add the Calendar.',
      });
    },
    ...config,
  });
};
