import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Slot, SlotDTO } from '../types';

const PARKING_SLOT_URL = '/parking/parking-spaces/';

export const getParkingSlots = async (): Promise<Slot[]> => {
  try {
    const { data } = await axios.get<SlotDTO[]>(PARKING_SLOT_URL);

    const parkingSlot = data.map((parkingSlotDto: SlotDTO) => {
      const {
        id,
        company,
        space,
        disability_space: disabilitySpace,
        free_space: freeSpace,
        total_space: totalSpace,
        disability_occupied_space: disabilityOccupiedSpace,
        free_occupied_space: freeOccupiedSpace,
        total_occupied_space: totalOccupiedSpace,
      } = parkingSlotDto;

      return {
        id,
        company,
        space,
        disabilitySpace,
        freeSpace,
        totalSpace,
        disabilityOccupiedSpace,
        freeOccupiedSpace,
        totalOccupiedSpace,
      };
    });

    return parkingSlot;
  } catch (error) {
    console.error('Error occurred while fetching parking slot:', error);
    throw new Error('Failed to fetch parking slot');
  }
};

type QueryFnType = typeof getParkingSlots;

type UseParkingSlotsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useParkingSlots = ({ config }: UseParkingSlotsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['parking-slot'],
    queryFn: () => getParkingSlots(),
  });
};
