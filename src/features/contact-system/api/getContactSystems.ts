import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { contactSystemSchema, ContactSystem } from '../types';

const CUSTOMER_URL = 'report/contract-system/';

export const getContactSystems = async (): Promise<ContactSystem[]> => {
  try {
    const response = await axios.get(CUSTOMER_URL);
    const contactSystems = response.data;

    console.log(contactSystems, 'contactSystems');

    // Validate the response data using Zod schema
    const parsedData = contactSystemSchema.array().safeParse(contactSystems);
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

type QueryFnType = typeof getContactSystems;

type UseContactSystemsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useContactSystems = ({ config }: UseContactSystemsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['contactSystems'],
    queryFn: getContactSystems,
    ...config,
  });
};
