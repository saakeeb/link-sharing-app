import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '@/components/Elements/Search/Dropdown';
import Search from '@/components/Elements/Search/Search';
import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';
import { useUsers } from '../api/getUsers';
import { AddUser } from '../components/AddUser';
import UsersList from '../components/UsersList';
import { User } from '../types';

export const ManageUsers = () => {
  const { t } = useTranslation();
  const { isLoading, isError, data: users, error, isFetching, refetch } = useUsers();
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('firstName');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const filtered = users?.filter((user) => handleSearch(user, searchText)) || [];
    setFilteredUsers(filtered);
  }, [searchText, searchField, users]);

  const handleSearch = (user: User, searchText: string) => {
    const fieldToSearch = searchField;
    const searchableField = String(user[fieldToSearch as keyof User]);
    return searchableField.toLowerCase().includes(searchText.toLowerCase());
  };

  const dropdownOptions = [
    { value: 'firstName', label: `${t('common.form_label.name')}` },
    { value: 'email', label: `${t('common.form_label.email')}` },
    { value: 'mobileNo', label: `${t('common.form_label.mobile_no')}` },
    { value: 'designationTitle', label: `${t('common.form_label.designation')}` },
  ];

  const onRefresh = () => {
    refetch();
  };

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading users: {message}</div>;
  }

  return (
    <ContentLayout title={t('pages.manage_users')} showTitle>
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
            <AddUser />
          </div>
          <UsersList
            dataSources={filteredUsers}
            onRefresh={onRefresh}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
