import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Role, RoleDTO } from '../types';

const ROLE_URL = '/app/groups/';

export const getRoles = async (): Promise<Role[]> => {
  try {
    const { data } = await axios.get<RoleDTO[]>(ROLE_URL);

    const roles = data.map((roleDto: RoleDTO) => {
      const {
        id,
        company,
        name,
        code,
        description,
        is_active: isActive,
        created_at: createdAt,
      } = roleDto;

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

    return roles;
  } catch (error) {
    console.error('Error occurred while fetching group:', error);
    throw new Error('Failed to fetch group');
  }
};

type QueryFnType = typeof getRoles;

type UseRolesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useRoles = ({ config }: UseRolesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['roles'],
    queryFn: () => getRoles(),
  });
};
