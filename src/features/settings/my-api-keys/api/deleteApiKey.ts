import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { ApiKey } from '../types';

const DELETE_API_KEY_URL = (apiKeyId: number) => `/definition/api-keys/${apiKeyId}/`;

const deleteApiKey = async ({ id }: ApiKey) => {
  try {
    await axios.delete(DELETE_API_KEY_URL(id));
  } catch (error) {
    console.error('Error occurred while deleting api key:', error);
    throw new Error('Failed to delete api key');
  }
};

type UseDeleteApiKeyOptions = {
  config?: MutationConfig<typeof deleteApiKey>;
};

export const useDeleteApiKey = ({ config }: UseDeleteApiKeyOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: deleteApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      addNotification({
        type: 'success',
        title: 'Api key has been deleted successfully',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error deleting api key',
        message: error.message || 'There was an error attempting to delete the api key.',
      });
    },
    ...config,
  });
};
