import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { CalendarData, CalendarDTO } from '../types';

const CALENDAR_URL = '/definition/calendars/';

export const getCalendars = async (): Promise<CalendarData[]> => {
  try {
    const { data } = await axios.get<CalendarDTO[]>(CALENDAR_URL);

    const calendars = data.map((calendarDto: CalendarDTO) => {
      const {
        id,
        company,
        year,
        name,
        date,
        day_type: dayType,
        day_type_name: dayTypeName,
        description,
        is_active: isActive,
        created_at: createdAt,
      } = calendarDto;

      return {
        id,
        company,
        date,
        year,
        name,
        dayType,
        dayTypeName,
        description,
        isActive,
        createdAt,
      };
    });

    return calendars;
  } catch (error) {
    console.error('Error occurred while fetching calendars:', error);
    throw new Error('Failed to fetch calendars');
  }
};

type QueryFnType = typeof getCalendars;

type UseCalendarsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCalendars = ({ config }: UseCalendarsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['calendar'],
    queryFn: () => getCalendars(),
  });
};
