import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Branch } from '../types';

const DELETE_BRANCH_URL = (id: number) => `/app/branches/${id}/`;

const deleteBranch = async ({ id }: Branch) => {
  try {
    await axios.delete(DELETE_BRANCH_URL(id));
  } catch (error) {
    console.error('Error occurred while deleting branch:', error);
    throw new Error('Failed to delete branch');
  }
};

type UseDeleteBranchOptions = {
  config?: MutationConfig<typeof deleteBranch>;
};

export const useDeleteBranch = ({ config }: UseDeleteBranchOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: deleteBranch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['branches'] });
      addNotification({
        type: 'success',
        title: 'Branch has been deleted successfully',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error deleting branch',
        message: error.message || 'There was an error attempting to delete the branch.',
      });
    },
    ...config,
  });
};
