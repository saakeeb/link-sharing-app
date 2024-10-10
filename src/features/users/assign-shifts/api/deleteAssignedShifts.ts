import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { AssignedShift } from '../types';

const DELETE_ASSIGNED_SHIFT_URL = (assignedShiftId: number) =>
  `/definition/shifts-assign/${assignedShiftId}/`;

const deleteAssignedShift = async ({ id }: AssignedShift) => {
  try {
    await axios.delete(DELETE_ASSIGNED_SHIFT_URL(id));
  } catch (error) {
    console.error('Error occurred while deleting assigned shift:', error);
    throw new Error('Failed to delete assigned shift');
  }
};

type UseDeleteAssignedShiftOptions = {
  config?: MutationConfig<typeof deleteAssignedShift>;
};

export const useDeleteAssignedShift = ({ config }: UseDeleteAssignedShiftOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: deleteAssignedShift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assigned-shifts'] });
      addNotification({
        type: 'success',
        title: 'Assigned shift has been deleted successfully',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error deleting assigned shift',
        message: error.message || 'There was an error attempting to delete the assigned shift.',
      });
    },
    ...config,
  });
};
