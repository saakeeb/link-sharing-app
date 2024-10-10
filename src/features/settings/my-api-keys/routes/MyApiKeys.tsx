import { useEffect, useState } from 'react';
import Search from '@/components/Elements/Search/Search';
import Dropdown from '@/components/Elements/Search/Dropdown';
import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';
import MyApiKeyList from '../components/MyApiKeyList';
import { ApiKey } from '../types';
import { useApiKeys } from '../api/getApiKeys';
import GenerateApiKeys from '../components/GenerateApiKeys';
import { useTranslation } from 'react-i18next';

export const MyApiKeys = () => {
  const { isLoading, isError, data: apiKeys, error, isFetching, refetch } = useApiKeys();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [filteredParkingSlots, setFilteredParkingSlots] = useState<ApiKey[]>([]);

  useEffect(() => {
    const filtered = apiKeys?.filter((apiKey) => handleSearch(apiKey, searchText)) || [];
    setFilteredParkingSlots(filtered);
  }, [searchText, searchField, apiKeys]);

  const handleSearch = (apiKey: ApiKey, searchText: string) => {
    const fieldToSearch = searchField;
    const searchableField = String(apiKey[fieldToSearch as keyof ApiKey]);
    return searchableField.toLowerCase().includes(searchText.toLowerCase());
  };

  const dropdownOptions = [
    { value: 'name', label:  t('common.form_label.name') },
    { value: 'key', label: t('common.form_label.key') },
  ];

  const onRefresh = () => {
    refetch();
  };

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading apiKeys: {message}</div>;
  }

  return (
    <ContentLayout title={t('pages.manage_api_keys')} showTitle>
      <div className="flex flex-col bg-white p-5 rounded-lg">
        <Authorization
          forbiddenFallback={<div>{t('common.errors.unauthorized')}</div>}
          allowedRoles={[ROLES.SUPER_ADMIN, ROLES.OWNER, ROLES.ADMIN, ROLES.OPERATOR]}
        >
          <div className="flex items-center justify-between space-x-3 mb-5">
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
            <GenerateApiKeys dataSources={apiKeys || []} />
          </div>
          <MyApiKeyList
            dataSources={filteredParkingSlots}
            onRefresh={onRefresh}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
