import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMenus } from '@/api/getMenus';
import { Button } from '@/components/Elements';
import Search from '@/components/Elements/Search/Search';
import { SelectField } from '@/components/Form/SelectField';
import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';
import PermissionsList from '../components/PermissionsList';
import { Permission } from '../types';
import { useRoles } from '../../groups/api/getRoles';

const transformMenuToPermissions = (menu: any): Permission[] => {
  return menu?.map((menuItem: any) => ({
    id: menuItem.id,
    name: menuItem.name,
    read: 'Read',
    allowRead: false,
    create: 'Create',
    allowCreate: false,
    update: 'Update',
    allowUpdate: false,
    delete: 'Delete',
    allowDelete: false,
    all: 'All',
    allowAll: false,
  }));
};

export const ManagePermissions = () => {
  const { t } = useTranslation();
  const { isLoading, isError, data: menus, error, isFetching, refetch } = useMenus();
  const { data: roles } = useRoles();
  const [searchText, setSearchText] = useState('');
  const [filteredRoles, setFilteredRoles] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [filteredPages, setFilteredPages] = useState<any[]>([]);

  useEffect(() => {
    const filtered = pages?.filter((page) => handleSearch(page, searchText)) || [];
    setFilteredPages(filtered);
  }, [pages, searchText]);

  useEffect(() => {
    if (roles) {
      const filtered = roles.map((role) => ({
        id: role.id,
        label: role.name,
        value: role.id,
      }));

      setFilteredRoles(filtered);
    }
  }, [roles]);

  useEffect(() => {
    const permissions = transformMenuToPermissions(menus);
    setPages(permissions);
  }, [menus]);

  const handleSearch = (page: any, searchText: string) => {
    const searchableFields = [page.name];
    return searchableFields.some((field) => field.toLowerCase().includes(searchText.toLowerCase()));
  };

  const onRefresh = () => {
    refetch();
  };

  const updatePermission = (id: string | number, field: keyof Permission, value: boolean) => {
    filteredPages?.forEach((item) => {
      if (item.id === id) {
        item[field] = value;
      }
    });

    setFilteredPages(filteredPages);
  };

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading roles: {message}</div>;
  }

  return (
    <ContentLayout title={t('pages.manage_permissions')} showTitle>
      <div className="flex flex-col bg-white p-5 rounded-lg">
        <Authorization
          forbiddenFallback={<div>{t('common.errors.unauthorized')}</div>}
          allowedRoles={[ROLES.SUPER_ADMIN, ROLES.OWNER, ROLES.ADMIN, ROLES.OPERATOR]}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-5 lg:space-y-0 lg:justify-between mb-5">
            <div className="w-2/6">
              <Search
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={t('common.placeholder.search')}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              {t('common.form_label.Role')}
              </label>
              <SelectField label="" placeholder={t('common.placeholder.select_role')} options={filteredRoles as []} />
            </div>
          </div>

          <PermissionsList
            dataSources={filteredPages}
            onRefresh={onRefresh}
            updatePermission={updatePermission}
            isFetching={isFetching}
            isLoading={isLoading}
          />
          <div className="mt-4 flex flex-row-reverse">
            <Button className="w-fit bg-primary-turquoise">Save</Button>
          </div>
        </Authorization>
      </div>
    </ContentLayout>
  );
};
