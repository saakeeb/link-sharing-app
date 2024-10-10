import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Shift, ShiftDTO } from '../types';

const ADD_SHIFT_URL = '/definition/shifts/';

const addShifts = async (shift: Shift): Promise<Shift> => {
  try {
    const shiftDto: ShiftDTO = {
      id: shift.id,
      company: shift.company,
      name: shift.name,
      code: shift.code,
      start_time: shift.startTime,
      end_time: shift.endTime,
      is_active: shift.isActive,
      created_at: shift.createdAt,
    };

    const { data } = await axios.post<ShiftDTO>(ADD_SHIFT_URL, shiftDto);

    const shiftData: Shift = {
      id: data.id,
      company: data.company,
      name: data.name,
      code: data.code,
      startTime: data.start_time,
      endTime: data.end_time,
      isActive: data.is_active,
      createdAt: data.created_at,
    };

    return shiftData;
  } catch (error) {
    console.error('Error occurred while adding shift:', error);
    throw new Error('Failed to add shift');
  }
};

type UseAddShiftOptions = {
  config?: MutationConfig<typeof addShifts>;
};

export const useAddShift = ({ config }: UseAddShiftOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: addShifts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
      addNotification({
        type: 'success',
        title: 'Shift has been added successfully.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error adding shift',
        message: error.message || 'There was an error attempting to add the shift.',
      });
    },
    ...config,
  });
};
