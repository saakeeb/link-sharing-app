import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '@/components/Elements/Search/Dropdown';
import Search from '@/components/Elements/Search/Search';
import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';
import { useCalendars } from '../api/getCalendar';
import AddCalendar from '../components/AddCalendar';
import CalendarsList from '../components/CalendarList';
import { CalendarData } from '../types';

export const ManageCalendar = () => {
  const { t } = useTranslation();
  const { isLoading, isError, data: calendars, error, isFetching, refetch } = useCalendars();
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [filteredCalendars, setFilteredCalendars] = useState<CalendarData[]>([]);

  useEffect(() => {
    const filtered = calendars?.filter((calendar) => handleSearch(calendar, searchText)) || [];
    setFilteredCalendars(filtered);
  }, [searchText, searchField, calendars]);

  const handleSearch = (calendar: CalendarData, searchText: string) => {
    const fieldToSearch = searchField;
    const searchableField = String(calendar[fieldToSearch as keyof CalendarData]);
    return searchableField.toLowerCase().includes(searchText.toLowerCase());
  };

  const dropdownOptions = [
    { value: 'name', label: `${t('common.form_label.name')}` },
    { value: 'year', label: `${t('common.form_label.year')}` },
    { value: 'date', label: `${t('common.form_label.date')}` },
    { value: 'dayTypeName', label: `${t('common.form_label.day_type')}` },
  ];

  const onRefresh = () => {
    refetch();
  };

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading calendars: {message}</div>;
  }

  return (
    <ContentLayout title={t('pages.manage_calendar')} showTitle>
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
            <AddCalendar />
          </div>
          <CalendarsList
            dataSources={filteredCalendars}
            onRefresh={onRefresh}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
