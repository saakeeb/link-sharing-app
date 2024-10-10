import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';

import { useCompany } from '../api/getCompanies';
import CompaniesList from '../components/CompanyList';
import { Company } from '../types';

export const ManageCompany = () => {
  const { t } = useTranslation();
  const { isLoading, isError, data: company, error, isFetching, refetch } = useCompany();
  const [filteredCompany, setFilteredCompany] = useState<Company[]>([]);

  useEffect(() => {
    const filtered = company?.filter((c) => handleSearch(c, '')) || [];
    setFilteredCompany(filtered);
  }, [company]);

  const handleSearch = (company: Company, searchText: string) => {
    const searchableFields = [company.name];
    return searchableFields.some((field) => field.toLowerCase().includes(searchText.toLowerCase()));
  };

  const onRefresh = () => {
    refetch();
  };

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading company: {message}</div>;
  }

  return (
    <ContentLayout title={t('pages.manage_company')} showTitle>
      <div className="flex flex-col bg-white p-5 rounded-lg">
        <Authorization
          forbiddenFallback={<div>{t('common.errors.unauthorized')}</div>}
          allowedRoles={[ROLES.SUPER_ADMIN, ROLES.OWNER, ROLES.ADMIN, ROLES.OPERATOR]}
        >
          <CompaniesList
            dataSources={filteredCompany}
            onRefresh={onRefresh}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
