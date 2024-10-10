import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Dropdown from '@/components/Elements/Search/Dropdown';
import Search from '@/components/Elements/Search/Search';
import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';

import { useCustomers } from '../api/getCustomers';
import CustomersList from '../components/CustomersList';
import { Customer } from '../types';

export const Customers = () => {
  const { t } = useTranslation();
  const { isLoading, isError, data: customers, error, isFetching, refetch } = useCustomers();
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('contract_id');
  const [filteredCustomer, setFilteredCustomer] = useState<Customer[]>([]);

  useEffect(() => {
    const filtered =
      customers?.filter((customer: Customer) => handleSearch(customer, searchText)) || [];
    setFilteredCustomer(filtered);
  }, [searchText, searchField, customers]);

  const handleSearch = (customer: Customer, searchText: string) => {
    const fieldToSearch = searchField;
    const searchableField = String(customer[fieldToSearch as keyof Customer]);
    return searchableField.toLowerCase().includes(searchText.toLowerCase());
  };

  const dropdownOptions = [
    { value: 'customer_name', label: `${t('common.form_label.customer_name')}` },
    { value: 'invoice_time', label: `${t('common.form_label.invoice_time')}` },
    { value: 'city', label: `${t('common.form_label.city')}` },
  ];

  const onRefresh = () => {
    refetch();
  };

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading maintenance reports: {message}</div>;
  }

  return (
    <ContentLayout title={t('pages.customers')} showTitle>
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
          </div>
          <CustomersList
            dataSources={filteredCustomer}
            onRefresh={onRefresh}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
