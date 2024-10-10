import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { customerSchema, Customer } from '../types';

const CUSTOMER_URL = 'report/customers/';

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await axios.get(CUSTOMER_URL);
    const customers = response.data;

    console.log(customers, 'customers');

    // Validate the response data using Zod schema
    const parsedData = customerSchema.array().safeParse(customers);
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

type QueryFnType = typeof getCustomers;

type UseCustomersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCustomers = ({ config }: UseCustomersOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['customers'],
    queryFn: getCustomers,
    ...config,
  });
};
