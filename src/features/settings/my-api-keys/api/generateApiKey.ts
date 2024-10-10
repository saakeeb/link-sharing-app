import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { ApiKey, ApiKeyDTO } from '../types';

const GENERATE_API_KEY = '/definition/api-keys/';

const generateApiKey = async (apiKey: ApiKey): Promise<ApiKey> => {
  try {
    const apiKeyDto: ApiKeyDTO = {
      id: apiKey.id,
      company: apiKey.company,
      name: apiKey.name,
      created_at: apiKey.createdAt,
    };

    const { data } = await axios.post<ApiKeyDTO>(GENERATE_API_KEY, apiKeyDto);

    const apiKeyData: ApiKey = {
      id: data.id,
      company: data.company,
      name: data.name,
      createdAt: data.created_at
    };

    return apiKeyData;
  } catch (error) {
    console.error('Error occurred while generating api key:', error);
    throw new Error('Failed to generate api key');
  }
};

type UseGenerateApiKeyOptions = {
  config?: MutationConfig<typeof generateApiKey>;
};

export const useGenerateApiKey = ({ config }: UseGenerateApiKeyOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: generateApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      addNotification({
        type: 'success',
        title: 'Api key has been generated successfully.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error generating api key',
        message: error.message || 'There was an error attempting to generate the api key.',
      });
    },
    ...config,
  });
};
