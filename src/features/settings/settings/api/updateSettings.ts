import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Settings, SettingsDTO } from '../types';

const UPDATE_SETTINGS_URL = (id: number) => `/app/settings/${id ? id : 1}/`;

const updateSettings = async (settings: Settings): Promise<Settings> => {
  try {
    const settingsDto: SettingsDTO = {
      id: settings.id,
      company: settings.company,
      date_format: settings.dateFormat,
      date_time_format: settings.dateTimeFormat,
      time_format: settings.timeFormat,
      order_by: settings.sortBy,
      decimal_places: settings.decimalPlaces,
      short_term_parking_time: settings.shortTermParkingTime,
    };

    const { data } = await axios.patch<SettingsDTO>(
      UPDATE_SETTINGS_URL(settingsDto.id),
      settingsDto
    );

    const settingsData: Settings = {
      id: data.id,
      company: data.company,
      dateFormat: data.date_format,
      dateTimeFormat: data.date_time_format,
      timeFormat: data.time_format,
      sortBy: data.order_by,
      decimalPlaces: data.decimal_places,
      shortTermParkingTime: data.short_term_parking_time,
    };

    return settingsData;
  } catch (error) {
    console.error('Error occurred while updating:', error);
    throw new Error('Failed to update settings');
  }
};

type UseUpdateSettingsOptions = {
  config?: MutationConfig<typeof updateSettings>;
};

export const useUpdateSettings = ({ config }: UseUpdateSettingsOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      addNotification({
        type: 'success',
        title: 'Settings has been ',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating settings',
        message: error.message || 'There was an error attempting to update the settings.',
      });
    },
    ...config,
  });
};
