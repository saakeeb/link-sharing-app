import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Menu, MenuDTO } from '../types';

const ADD_MENU_URL = '/app/menus/';

export const addMenus = async (menu: Menu): Promise<Menu> => {
  try {
    const menuDto: MenuDTO = {
      id: menu.id,
      company: menu.company,
      name: menu.name,
      parent: menu.parent,
      code: menu.code,
      route_path: menu.route,
      content_type: menu.contentType,
      serial_no: menu.serialNo,
      is_active: menu.isActive,
      language_key: menu.languageKey,
      created_at: menu.createdAt,
    };
    if (menu.icon) {
      menuDto.icon_path = menu.icon;
    }

    const { data } = await axios.post<MenuDTO>(ADD_MENU_URL, menuDto);

    const menuData: Menu = {
      id: data.id,
      company: data.company,
      name: data.name,
      icon: data.icon,
      languageKey: data.language_key,
      parent: data.parent,
      code: data.code,
      contentType: data.content_type,
      route: data.route_path,
      serialNo: data.serial_no,
      isActive: data.is_active,
      createdAt: data.created_at,
    };

    return menuData;
  } catch (error) {
    console.error('Error occurred while adding menu:', error);
    throw new Error('Failed to add menu');
  }
};

type UseAddMenuOptions = {
  config?: MutationConfig<typeof addMenus>;
};

export const useAddMenu = ({ config }: UseAddMenuOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: addMenus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      addNotification({
        type: 'success',
        title: 'Menu has been added successfully.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error adding menu',
        message: error.message || 'There was an error attempting to add the menu.',
      });
    },
    ...config,
  });
};
