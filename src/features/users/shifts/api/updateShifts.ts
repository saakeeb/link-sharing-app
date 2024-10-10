import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Shift, ShiftDTO } from '../types';

const UPDATE_SHIFT_URL = (id: number) => `/definition/shifts/${id}/`;

const updateShift = async (shift: Shift): Promise<Shift> => {
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

    const { data } = await axios.patch<ShiftDTO>(UPDATE_SHIFT_URL(shiftDto.id), shiftDto);

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
    console.error('Error occurred while updating shift:', error);
    throw new Error('Failed to update shift');
  }
};

type UseUpdateShiftOptions = {
  config?: MutationConfig<typeof updateShift>;
};

export const useUpdateShift = ({ config }: UseUpdateShiftOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateShift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
      addNotification({
        type: 'success',
        title: 'Your changes have been successfully saved.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating shift',
        message: error.message || 'There was an error attempting to update the shift.',
      });
    },
    ...config,
  });
};
