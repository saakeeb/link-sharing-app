import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { DropdownEntity } from '@/types';

const DAY_TYPE_URL = '/definition/day-types/';

type DayTypeListDTO = {
  id: number;
  label: string;
};

export const getDayTypeList = async (): Promise<DropdownEntity[]> => {
  try {
    const { data } = await axios.get<DayTypeListDTO[]>(DAY_TYPE_URL);

    const dayTypeList = data.map((dayTypeListDto: DayTypeListDTO) => {
      const { id, label } = dayTypeListDto;

      return {
        id,
        label,
        value: id.toString(),
      };
    });

    return dayTypeList;
  } catch (error) {
    console.error('Error occurred while fetching dayType list:', error);
    throw new Error('Failed to fetch dayType list');
  }
};

type QueryFnType = typeof getDayTypeList;

type UseDesignationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useDayTypeList = ({ config }: UseDesignationsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['day-type-list'],
    queryFn: () => getDayTypeList(),
  });
};
