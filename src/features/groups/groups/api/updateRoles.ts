import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Role, RoleDTO } from '../types';

const UPDATE_ROLE_URL = (id: number) => `/app/groups/${id}/update/`;

const updateRole = async (role: Role): Promise<Role> => {
  try {
    const roleDto: RoleDTO = {
      id: role.id,
      company: role.company,
      name: role.name,
      code: role.code,
      description: role.description,
      is_active: role.isActive,
      created_at: role.createdAt,
    };

    const { data } = await axios.patch<RoleDTO>(UPDATE_ROLE_URL(roleDto.id), roleDto);

    const roleData: Role = {
      id: data.id,
      company: data.company,
      name: data.name,
      code: data.code,
      description: data.description,
      isActive: data.is_active,
      createdAt: data.created_at,
    };

    return roleData;
  } catch (error) {
    console.error('Error occurred while updating group:', error);
    throw new Error('Failed to update group');
  }
};

type UseUpdateRoleOptions = {
  config?: MutationConfig<typeof updateRole>;
};

export const useUpdateRole = ({ config }: UseUpdateRoleOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      addNotification({
        type: 'success',
        title: 'Your changes have been successfully saved.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating role',
        message: error.message || 'There was an error attempting to update the group.',
      });
    },
    ...config,
  });
};
