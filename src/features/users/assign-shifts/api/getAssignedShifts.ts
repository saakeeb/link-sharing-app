import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { AssignedShift, AssignedShiftDTO } from '../types';

const ASSIGNED_SHIFT_URL = '/definition/shifts-assign/';

export const getAssignedShifts = async (): Promise<AssignedShift[]> => {
  try {
    const { data } = await axios.get<AssignedShiftDTO[]>(ASSIGNED_SHIFT_URL);

    const assignedShifts = data.map((assignedShiftDto: AssignedShiftDTO) => {
      const {
        id,
        company,
        user: operator,
        shift,
        first_name: firstName,
        last_name: lastName,
        shift_name: shiftName,
        shift_start_time: startTime,
        shift_end_time: endTime,
        is_active: isActive,
        created_at: createdAt,
      } = assignedShiftDto;

      return {
        id,
        company,
        shift,
        operator,
        firstName,
        lastName,
        operatorName: `${firstName} ${lastName}`,
        shiftName,
        startTime,
        endTime,
        isActive,
        createdAt,
      };
    });

    return assignedShifts;
  } catch (error) {
    console.error('Error occurred while fetching assigned shifts:', error);
    throw new Error('Failed to fetch assigned shifts');
  }
};

type QueryFnType = typeof getAssignedShifts;

type UseAssignedShiftsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useAssignedShifts = ({ config }: UseAssignedShiftsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['assigned-shifts'],
    queryFn: () => getAssignedShifts(),
  });
};
