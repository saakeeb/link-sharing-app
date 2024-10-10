import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { AssignedShift, AssignedShiftDTO } from '../types';

const UPDATE_ASSIGNED_SHIFT_URL = (id: number) => `/definition/shifts-assign/${id}/`;

const updateAssignedShift = async (assignedShift: AssignedShift): Promise<AssignedShift> => {
  try {
    const assignedShiftDto: AssignedShiftDTO = {
      id: assignedShift.id,
      company: assignedShift.company,
      user: assignedShift.operator,
      shift: assignedShift.shift,
      is_active: assignedShift.isActive,
      created_at: assignedShift.createdAt,
    };

    const { data } = await axios.patch<AssignedShiftDTO>(
      UPDATE_ASSIGNED_SHIFT_URL(assignedShiftDto.id),
      assignedShiftDto
    );

    const assignedShiftData: AssignedShift = {
      id: data.id,
      company: data.company,
      operator: data.user,
      shift: data.shift,
      shiftName: data.shift_name,
      firstName: data.first_name,
      lastName: data.last_name,
      startTime: data.shift_start_time,
      endTime: data.shift_end_time,
      isActive: data.is_active,
      createdAt: data.created_at,
    };

    return assignedShiftData;
  } catch (error) {
    console.error('Error occurred while updating assigned shift:', error);
    throw new Error('Failed to update assigned shift');
  }
};

type UseUpdateAssignedShiftOptions = {
  config?: MutationConfig<typeof updateAssignedShift>;
};

export const useUpdateAssignedShift = ({ config }: UseUpdateAssignedShiftOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateAssignedShift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assigned-shifts'] });
      addNotification({
        type: 'success',
        title: 'Your changes have been successfully saved.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating assigned shift',
        message: error.message || 'There was an error attempting to update the assigned shift.',
      });
    },
    ...config,
  });
};
