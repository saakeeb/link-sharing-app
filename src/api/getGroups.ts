import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Role, RoleDTO } from '@/features/groups/groups/types';

const GROUP_URL = '/app/groups/';

export const getRoles = async (): Promise<Role[]> => {
  try {
    const { data } = await axios.get<RoleDTO[]>(GROUP_URL);

    const groups = data.map((groupDto: RoleDTO) => {
      const {
        id,
        company,
        name,
        code,
        description,
        is_active: isActive,
        created_at: createdAt,
      } = groupDto;

      return {
        id,
        company,
        name,
        code,
        description,
        isActive,
        createdAt,
      };
    });

    return groups;
  } catch (error) {
    console.error('Error occurred while fetching groups:', error);
    throw new Error('Failed to fetch groups');
  }
};

type QueryFnType = typeof getRoles;

type UseGroupsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGroups = ({ config }: UseGroupsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['roles'],
    queryFn: () => getRoles(),
  });
};
