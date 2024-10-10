import { useQuery } from '@tanstack/react-query';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Shift, ShiftDTO } from '../types';
import { axios } from '@/lib/axios';

const SHIFT_URL = '/definition/shifts/';

export const getShifts = async (): Promise<Shift[]> => {
  try {
    const { data } = await axios.get<ShiftDTO[]>(SHIFT_URL);

    const shifts = data.map((shiftDto: ShiftDTO) => {
      const {
        id,
        company,
        name,
        code,
        start_time: startTime,
        end_time: endTime,
        is_active: isActive,
        created_at: createdAt,
      } = shiftDto;

      return {
        id,
        name,
        company,
        code,
        startTime,
        endTime,
        isActive,
        createdAt,
      };
    });

    return shifts;
  } catch (error) {
    console.error('Error occurred while fetching shifts:', error);
    throw new Error('Failed to fetch shifts');
  }
};

type QueryFnType = typeof getShifts;

type UseShiftsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useShifts = ({ config }: UseShiftsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['shifts'],
    queryFn: () => getShifts(),
  });
};
