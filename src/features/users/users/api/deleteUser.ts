import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { User } from '../types';

const DELETE_USER_URL = (userId: number) => `/app/users/${userId}/delete/`;

const deleteUser = async ({ id }: User) => {
  try {
    await axios.put(DELETE_USER_URL(id));
  } catch (error) {
    console.error('Error occurred while deleting user:', error);
    throw new Error('Failed to delete user');
  }
};

type UseDeleteUserOptions = {
  config?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({ config }: UseDeleteUserOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      addNotification({
        type: 'success',
        title: 'User has been deleted successfully',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error deleting user',
        message: error.message || 'There was an error attempting to delete the user.',
      });
    },
    ...config,
  });
};
