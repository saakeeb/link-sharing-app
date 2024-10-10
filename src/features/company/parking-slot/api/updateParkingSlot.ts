import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Slot, SlotDTO } from '../types';

const UPDATE_PARKING_SLOT_URL = (id: number) => `/parking/parking-spaces/${id}/`;

const updateParkingSlot = async (parkingSlot: Slot): Promise<Slot> => {
  try {
    const parkingSlotDto: SlotDTO = {
      id: parkingSlot.id,
      company: parkingSlot.company,
      space: parkingSlot.space,
      disability_space: parkingSlot.disabilitySpace,
      free_space: parkingSlot.freeSpace,
      total_space: parkingSlot.totalSpace,
      disability_occupied_space: parkingSlot.disabilityOccupiedSpace,
      free_occupied_space: parkingSlot.freeOccupiedSpace,
      total_occupied_space: parkingSlot.totalOccupiedSpace,
    };

    const { data } = await axios.patch<SlotDTO>(
      UPDATE_PARKING_SLOT_URL(parkingSlotDto.id),
      parkingSlotDto
    );

    const parkingSlotData: Slot = {
      id: data.id,
      company: data.company,
      space: data.space,
      disabilitySpace: data.disability_space,
      freeSpace: data.free_space,
      totalSpace: data.total_space,
      disabilityOccupiedSpace: data.disability_occupied_space,
      freeOccupiedSpace: data.free_occupied_space,
      totalOccupiedSpace: data.total_occupied_space,
    };

    return parkingSlotData;
  } catch (error) {
    console.error('Error occurred while updating parking slot:', error);
    throw new Error('Failed to update parking slot');
  }
};

type UseUpdateParkingSlotOptions = {
  config?: MutationConfig<typeof updateParkingSlot>;
};

export const useUpdateParkingSlot = ({ config }: UseUpdateParkingSlotOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateParkingSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parking-slot'] });
      addNotification({
        type: 'success',
        title: 'Your changes have been successfully saved.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating parkingSlot',
        message: error.message || 'There was an error attempting to update the parking slot.',
      });
    },
    ...config,
  });
};
