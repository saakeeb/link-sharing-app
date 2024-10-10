import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { serviceCallSchema, ServiceCall } from '../types';

const CUSTOMER_URL = 'report/service-call/';

export const getServiceCalls = async (): Promise<ServiceCall[]> => {
  try {
    const response = await axios.get(CUSTOMER_URL);
    const serviceCalls = response.data;

    console.log(serviceCalls, 'serviceCalls');

    // Validate the response data using Zod schema
    const parsedData = serviceCallSchema.array().safeParse(serviceCalls);
    console.log(parsedData, 'parsedData');

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

type QueryFnType = typeof getServiceCalls;

type UseServiceCallsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useServiceCalls = ({ config }: UseServiceCallsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['serviceCalls'],
    queryFn: getServiceCalls,
    ...config,
  });
};
