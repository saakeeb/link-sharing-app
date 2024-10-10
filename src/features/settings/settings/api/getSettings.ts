import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Settings, SettingsDTO } from '../types';

const SETTINGS_URL = '/app/settings/';

export const getSettings = async (): Promise<Settings[]> => {
  try {
    const { data } = await axios.get<SettingsDTO[]>(SETTINGS_URL);

    const settings = data.map((settingsDto: SettingsDTO) => {
      const {
        id,
        company,
        date_format: dateFormat,
        date_time_format: dateTimeFormat,
        time_format: timeFormat,
        order_by: sortBy,
        decimal_places: decimalPlaces,
        short_term_parking_time: shortTermParkingTime,
      } = settingsDto;

      return {
        id,
        company,
        dateTimeFormat,
        dateFormat,
        timeFormat,
        sortBy,
        decimalPlaces,
        shortTermParkingTime
      };
    });

    return settings;
  } catch (error) {
    console.error('Error occurred while fetching settings:', error);
    throw new Error('Failed to fetch settings');
  }
};

type QueryFnType = typeof getSettings;

type UseSettingsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useSettings = ({ config }: UseSettingsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['settings'],
    queryFn: () => getSettings(),
  });
};
