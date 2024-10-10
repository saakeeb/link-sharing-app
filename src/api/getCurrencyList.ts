import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { DropdownEntity } from '@/types';

const COUNTRY_URL = '/definition/currencies/';

type CurrencyListDTO = {
  id: number;
  name: string;
};

export const getCurrencyList = async (): Promise<DropdownEntity[]> => {
  try {
    const { data } = await axios.get<CurrencyListDTO[]>(COUNTRY_URL);

    const currencyList = data.map((currencyListDto: CurrencyListDTO) => {
      const { id, name: label } = currencyListDto;

      return {
        id,
        label,
        value: id.toString(),
      };
    });

    return currencyList;
  } catch (error) {
    console.error('Error occurred while fetching currency list:', error);
    throw new Error('Failed to fetch currency list');
  }
};

type QueryFnType = typeof getCurrencyList;

type UseDesignationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCurrencyList = ({ config }: UseDesignationsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['currency-list'],
    queryFn: () => getCurrencyList(),
  });
};
