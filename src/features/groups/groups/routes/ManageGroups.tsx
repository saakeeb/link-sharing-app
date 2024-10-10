import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '@/components/Elements/Search/Dropdown';
import Search from '@/components/Elements/Search/Search';
import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';
import { useRoles } from '../api/getRoles';
import AddRole from '../components/AddRole';
import RolesList from '../components/RoleList';
import { Role } from '../types';

export const ManageGroups = () => {
  const { t } = useTranslation();
  const { isLoading, isError, data: roles, error, isFetching, refetch } = useRoles();
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);

  useEffect(() => {
    const filtered = roles?.filter((role) => handleSearch(role, searchText)) || [];
    setFilteredRoles(filtered);
  }, [searchText, searchField, roles]);

  const handleSearch = (role: Role, searchText: string) => {
    const fieldToSearch = searchField;
    const searchableField = String(role[fieldToSearch as keyof Role]);

    return searchableField.toLowerCase().includes(searchText.toLowerCase());
  };

  const dropdownOptions = [
    { value: 'name', label: `${t('common.form_label.name')}` },
    { value: 'code', label: `${t('common.form_label.code')}` },
  ];

  const onRefresh = () => {
    refetch();
  };

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading roles: {message}</div>;
  }

  return (
    <ContentLayout title={t('pages.manage_groups')} showTitle>
      <div className="flex flex-col bg-white p-5 rounded-lg">
        <Authorization
          forbiddenFallback={<div>{t('common.errors.unauthorized')}</div>}
          allowedRoles={[ROLES.SUPER_ADMIN, ROLES.OWNER, ROLES.ADMIN, ROLES.OPERATOR]}
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
            <AddRole />
          </div>
          <RolesList
            dataSources={filteredRoles}
            onRefresh={onRefresh}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
