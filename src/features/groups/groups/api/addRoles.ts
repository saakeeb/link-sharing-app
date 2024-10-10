import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Role, RoleDTO } from '../types';

const ADD_ROLE_URL = '/app/groups/create/';

const addRoles = async (role: Role): Promise<Role> => {
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

    const { data } = await axios.post<RoleDTO>(ADD_ROLE_URL, roleDto);

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
    console.error('Error occurred while adding group:', error);
    throw new Error('Failed to add group');
  }
};

type UseAddRoleOptions = {
  config?: MutationConfig<typeof addRoles>;
};

export const useAddRole = ({ config }: UseAddRoleOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: addRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      addNotification({
        type: 'success',
        title: 'Group has been added successfully.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error adding group',
        message: error.message || 'There was an error attempting to add the group.',
      });
    },
    ...config,
  });
};
