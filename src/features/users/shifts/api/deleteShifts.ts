import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Shift } from '../types';

const DELETE_SHIFT_URL = (shiftId: number) => `/definition/shifts/${shiftId}/`;

const deleteShift = async ({ id }: Shift) => {
  try {
    await axios.delete(DELETE_SHIFT_URL(id));
  } catch (error) {
    console.error('Error occurred while deleting shift:', error);
    throw new Error('Failed to delete shift');
  }
};

type UseDeleteShiftOptions = {
  config?: MutationConfig<typeof deleteShift>;
};

export const useDeleteShift = ({ config }: UseDeleteShiftOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: deleteShift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
      addNotification({
        type: 'success',
        title: 'Shift has been deleted successfully',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error deleting shift',
        message: error.message || 'There was an error attempting to delete the shift.',
      });
    },
    ...config,
  });
};
