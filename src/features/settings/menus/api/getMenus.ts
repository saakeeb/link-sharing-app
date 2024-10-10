import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Menu, MenuDTO } from '../types';

const MENU_URL = '/app/menus/';

export const getMenus = async (): Promise<Menu[]> => {
  try {
    const { data } = await axios.get<MenuDTO[]>(MENU_URL);

    const menus = data.map((menuDto: MenuDTO) => {
      const {
        id,
        company,
        name,
        code,
        parent,
        parent_name: parentName,
        icon,
        content_type: contentType,
        route_path: route,
        serial_no: serialNo,
        is_active: isActive,
        created_at: createdAt,
        language_key: languageKey,
      } = menuDto;

      return {
        id,
        company,
        name,
        code,
        parent,
        parentName,
        contentType,
        icon,
        route,
        serialNo,
        isActive,
        createdAt,
        languageKey,
      };
    });

    return menus;
  } catch (error) {
    console.error('Error occurred while fetching menus:', error);
    throw new Error('Failed to fetch menus');
  }
};

type QueryFnType = typeof getMenus;

type UseMenusOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMenus = ({ config }: UseMenusOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['menus'],
    queryFn: () => getMenus(),
  });
};
