import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { AssignedShift, AssignedShiftDTO } from '../types';

const ADD_ASSIGNED_SHIFT_URL = '/definition/shifts-assign/';

const addAssignedShifts = async (assignedShift: AssignedShift): Promise<AssignedShift> => {
  try {
    const assignedShiftDto: AssignedShiftDTO = {
      id: assignedShift.id,
      company: assignedShift.company,
      user: assignedShift.operator,
      shift: assignedShift.shift,
      is_active: assignedShift.isActive,
      created_at: assignedShift.createdAt,
    };

    const { data } = await axios.post<AssignedShiftDTO>(ADD_ASSIGNED_SHIFT_URL, assignedShiftDto);

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
    console.error('Error occurred while adding assigned shift:', error);
    throw new Error('Failed to add assignedShift');
  }
};

type UseAddAssignedShiftOptions = {
  config?: MutationConfig<typeof addAssignedShifts>;
};

export const useAddAssignedShift = ({ config }: UseAddAssignedShiftOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: addAssignedShifts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assigned-shifts'] });
      addNotification({
        type: 'success',
        title: 'Assigned shift has been added successfully.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error adding assignedShift',
        message: error.message || 'There was an error attempting to add the assigned shift.',
      });
    },
    ...config,
  });
};
