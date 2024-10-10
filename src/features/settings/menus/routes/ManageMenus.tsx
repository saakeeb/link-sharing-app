import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Search from '@/components/Elements/Search/Search';
import Dropdown from '@/components/Elements/Search/Dropdown';
import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';
import { useMenus } from '../api/getMenus';
import { AddMenu } from '../components/AddMenu';
import { MenusList } from '../components/MenusList';
import { Menu } from '../types';

export const ManageMenus = () => {
  const { t } = useTranslation();
  const { isLoading, isError, data: menus, error, isFetching, refetch } = useMenus();

  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const filtered = menus?.filter((menu) => handleSearch(menu, searchText)) || [];
    setFilteredMenus(filtered);
  }, [searchText, searchField, menus]);

  const handleSearch = (menu: Menu, searchText: string) => {
    const fieldToSearch = searchField;
    const searchableField = String(menu[fieldToSearch as keyof Menu]);
    return searchableField.toLowerCase().includes(searchText.toLowerCase());
  };

  const dropdownOptions = [
    { value: 'name', label: t('common.form_label.name') },
    { value: 'code', label: t('common.form_label.code') },
    { value: 'parentName', label: t('common.form_label.parent') },
    { value: 'route', label: t('common.form_label.route') },
    { value: 'serialNo', label: t('common.form_label.serial_no') },
  ];

  const onRefresh = () => {
    refetch();
  };

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading menus: {message}</div>;
  }

  return (
    <ContentLayout title={t('pages.manage_sidebar')} showTitle>
      <div className="flex flex-col bg-white p-5 rounded-lg">
        <Authorization
          forbiddenFallback={<div>{t('common.errors.unauthorized')}</div>}
          allowedRoles={[ROLES.SUPER_ADMIN]}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-5 lg:space-y-0 lg:justify-between mb-5">
            <div className="flex w-full sm:w-[440px]">
              <div className="w-full min-w-[180px] sm:min-w-[300px]">
                <Search
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={t('common.placeholder.search')}
                  className="rounded-r-none"
                />
              </div>
              <div className="w-[105px]">
                <Dropdown
                  options={dropdownOptions}
                  value={searchField}
                  onChange={(value) => setSearchField(value)}
                  className="border-l-0 focus:border-l focus:border-l-[#00B7C8] focus:outline-[1px] focus:outline-[#00B7C8] rounded-l-none"
                />
              </div>
            </div>
            <AddMenu />
          </div>
          <MenusList
            dataSources={filteredMenus}
            onRefresh={onRefresh}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
