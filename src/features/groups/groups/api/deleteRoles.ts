import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Role } from '../types';

const DELETE_ROLE_URL = (roleId: number) => `/app/groups/${roleId}/delete/`;

const deleteRole = async ({ id, company }: Role) => {
  try {
    await axios.patch(DELETE_ROLE_URL(id), { company: company });
  } catch (error) {
    console.error('Error occurred while deleting group:', error);
    throw new Error('Failed to delete group');
  }
};

type UseDeleteRoleOptions = {
  config?: MutationConfig<typeof deleteRole>;
};

export const useDeleteRole = ({ config }: UseDeleteRoleOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      addNotification({
        type: 'success',
        title: 'Group has been deleted successfully',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error deleting role',
        message: error.message || 'There was an error attempting to delete the group.',
      });
    },
    ...config,
  });
};
