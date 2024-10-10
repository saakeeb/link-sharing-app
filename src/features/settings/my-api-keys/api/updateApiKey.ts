import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { ApiKey, ApiKeyDTO } from '../types';

const UPDATE_API_KEY_URL = (id: number) => `/definition/api-keys/${id}/`;

const updateApiKey = async (apiKey: ApiKey): Promise<ApiKey> => {
  try {
    const apiKeyDto: ApiKeyDTO = {
      id: apiKey.id,
      company: apiKey.company,
      name: apiKey.name,
      is_active: apiKey.isActive,
      created_at: apiKey.createdAt,
    };

    const { data } = await axios.patch<ApiKeyDTO>(UPDATE_API_KEY_URL(apiKeyDto.id), apiKeyDto);

    const apiKeyData: ApiKey = {
      id: data.id,
      company: data.company,
      name: data.name,
      isActive: data.is_active,
      createdAt: data.created_at,
    };

    return apiKeyData;
  } catch (error) {
    console.error('Error occurred while updating api key:', error);
    throw new Error('Failed to update api key');
  }
};

type UseUpdateApiKeyOptions = {
  config?: MutationConfig<typeof updateApiKey>;
};

export const useUpdateApiKey = ({ config }: UseUpdateApiKeyOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      addNotification({
        type: 'success',
        title: 'Your changes have been successfully saved.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating api key',
        message: error.message || 'There was an error attempting to update the api key.',
      });
    },
    ...config,
  });
};
