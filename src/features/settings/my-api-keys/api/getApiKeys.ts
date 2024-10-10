import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { ApiKey, ApiKeyDTO } from '../types';

const PARKING_SLOT_URL = '/definition/api-keys/';

export const getApiKeys = async (): Promise<ApiKey[]> => {
  try {
    const { data } = await axios.get<ApiKeyDTO[]>(PARKING_SLOT_URL);

    const parkingSlot = data.map((priceDto: ApiKeyDTO) => {
      const { id, company, name, key, is_active: isActive, created_at: createdAt } = priceDto;

      return {
        id,
        company,
        name,
        key,
        createdAt,
        isActive,
      };
    });

    return parkingSlot;
  } catch (error) {
    console.error('Error occurred while fetching api keys:', error);
    throw new Error('Failed to fetch api keys');
  }
};

type QueryFnType = typeof getApiKeys;

type UseApiKeysOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useApiKeys = ({ config }: UseApiKeysOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['api-keys'],
    queryFn: () => getApiKeys(),
  });
};
