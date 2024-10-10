import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { maintenancePlanSchema, MaintenancePlan } from '../types';

const MAINTENANCE_PLAN_URL = 'report/maintenance-plan/';

export const getMaintenancePlans = async (): Promise<MaintenancePlan[]> => {
  try {
    const response = await axios.get(MAINTENANCE_PLAN_URL);
    const maintenancePlans = response.data;

    // Validate the response data using Zod schema
    const parsedData = maintenancePlanSchema.array().safeParse(maintenancePlans);

    if (!parsedData.success) {
      console.error(parsedData.error);
      throw new Error('Invalid data format');
    }

    return parsedData.data;
  } catch (error) {
    console.error('Failed to fetch maintenance plans:', error);
    throw new Error('Failed to fetch maintenance plans');
  }
};

type QueryFnType = typeof getMaintenancePlans;

type UseMaintenancePlansOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMaintenancePlans = ({ config }: UseMaintenancePlansOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['maintenancePlans'],
    queryFn: getMaintenancePlans,
    ...config,
  });
};
