import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Menu } from '../types';

const DELETE_MENU_URL = (id: number) => `/app/menus/${id}/`;

const deleteMenu = async ({ id, company }: Menu) => {
  try {
    await axios.delete(DELETE_MENU_URL(id));
  } catch (error) {
    console.error('Error occurred while deleting menu:', error);
    throw new Error('Failed to delete menu');
  }
};

type UseDeleteMenuOptions = {
  config?: MutationConfig<typeof deleteMenu>;
};

export const useDeleteMenu = ({ config }: UseDeleteMenuOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      addNotification({
        type: 'success',
        title: 'Menu has been deleted successfully',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error deleting menu',
        message: error.message || 'There was an error attempting to delete the menu.',
      });
    },
    ...config,
  });
};
