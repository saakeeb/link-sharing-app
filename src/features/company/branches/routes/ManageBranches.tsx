import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Search from '@/components/Elements/Search/Search';
import Dropdown from '@/components/Elements/Search/Dropdown';
import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';
import { useBranches } from '../api/getBranches';
import AddBranch from '../components/AddBranch';
import BranchList from '../components/BranchList';
import { Branch } from '../types';

export const ManageBranches = () => {
  const { t } = useTranslation();
  const { isLoading, isError, data: branches, error, isFetching, refetch } = useBranches();
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const filtered = branches?.filter((branch) => handleSearch(branch, searchText)) || [];
    setFilteredBranches(filtered);
  }, [searchText, searchField, branches]);

  const handleSearch = (branch: Branch, searchText: string) => {
    const fieldToSearch = searchField;
    const searchableField = String(branch[fieldToSearch as keyof Branch]);
    return searchableField.toLowerCase().includes(searchText.toLowerCase());
  };

  const dropdownOptions = [
    { value: 'name', label:`${t('common.form_label.name')}`},
    { value: 'parentName', label: `${t('common.form_label.parent')}` },
    { value: 'email', label: `${t('common.form_label.email')}` },
    { value: 'mobileNo', label: `${t('common.form_label.mobile_no')}` },
    { value: 'address', label: `${t('common.form_label.address')}` },
  ];

  const onRefresh = () => {
    refetch();
  };

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading branches: {message}</div>;
  }

  return (
    <ContentLayout title={t('pages.manage_branch')} showTitle>
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
            <AddBranch />
          </div>
          <BranchList
            dataSources={filteredBranches}
            onRefresh={onRefresh}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
