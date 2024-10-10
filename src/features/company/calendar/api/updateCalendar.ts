import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { CalendarData, CalendarDTO } from '../types';

const UPDATE_ROLE_URL = (id: number) => `/definition/calendars/${id}/`;

const updateCalendar = async (calendar: CalendarData): Promise<CalendarData> => {
  try {
    const calendarDto: CalendarDTO = {
      id: calendar.id,
      company: calendar.company,
      year: calendar.year,
      name: calendar.name,
      date: calendar.date,
      day_type: calendar.dayType,
      description: calendar.description,
      is_active: calendar.isActive,
      created_at: calendar.createdAt,
    };

    const { data } = await axios.patch<CalendarDTO>(UPDATE_ROLE_URL(calendarDto.id), calendarDto);

    const calendarData: CalendarData = {
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

    return calendarData;
  } catch (error) {
    console.error('Error occurred while updating calendar:', error);
    throw new Error('Failed to update calendar');
  }
};

type UseUpdateCalendarOptions = {
  config?: MutationConfig<typeof updateCalendar>;
};

export const useUpdateCalendar = ({ config }: UseUpdateCalendarOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateCalendar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
      addNotification({
        type: 'success',
        title: 'Your changes have been successfully saved.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating calendar',
        message: error.message || 'There was an error attempting to update the calendar.',
      });
    },
    ...config,
  });
};
