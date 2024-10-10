import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '@/components/Elements/Search/Dropdown';
import Search from '@/components/Elements/Search/Search';
import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';
import { useAssignedShifts } from '../api/getAssignedShifts';
import AddAssignedShift from '../components/AddAssignShift';
import AssignedShiftsList from '../components/AssignedShiftsList';
import { AssignedShift } from '../types';

export const AssignShift = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    isError,
    data: assignedShifts,
    error,
    isFetching,
    refetch,
  } = useAssignedShifts();

  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('operatorName');
  const [filteredAssignedShifts, setFilteredAssignedShifts] = useState<AssignedShift[]>([]);

  useEffect(() => {
    const filtered =
      assignedShifts?.filter((assignedShift) => handleSearch(assignedShift, searchText)) || [];
    setFilteredAssignedShifts(filtered);
  }, [searchText, searchField, assignedShifts]);

  const handleSearch = (assignedShift: AssignedShift, searchText: string) => {
    const fieldToSearch = searchField;
    const searchableField = String(assignedShift[fieldToSearch as keyof AssignedShift]);
    return searchableField.toLowerCase().includes(searchText.toLowerCase());
  };

  const dropdownOptions = [
    { value: 'operatorName', label: `${t('common.form_label.operator')}` },
    { value: 'shiftName', label:`${t('common.form_label.shift')}` },
    { value: 'startTime', label: `${t('common.form_label.start_time')}` },
    { value: 'endTime', label: `${t('common.form_label.end_time')}` },
  ];

  const onRefresh = () => {
    refetch();
  };

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading assignedShifts: {message}</div>;
  }

  return (
    <ContentLayout title={t('pages.assign_shift')} showTitle>
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
            <AddAssignedShift />
          </div>
          <AssignedShiftsList
            dataSources={filteredAssignedShifts}
            onRefresh={onRefresh}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
