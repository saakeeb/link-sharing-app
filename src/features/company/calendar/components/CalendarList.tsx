import { Table } from '@/components/Elements';
import dayjs from 'dayjs';
import ActiveIndicator from '@/components/Elements/ActiveIndicator/ActiveIndicator';
import { TableColumn } from '@/types';
import { useSystemConfigStore } from '@/stores/SystemConfigStore';
import { DEFAULT_DATE_FORMAT } from '@/utils/constants';
import { CalendarData } from '../types';
import UpdateCalendar from './UpdateCalendar';
import DeleteCalendar from './DeleteCalendar';
import { useTranslation } from 'react-i18next';

type CalendarListProps = {
  dataSources: CalendarData[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

const CalendarsList = ({
  dataSources: data,
  onRefresh,
  isLoading,
  isFetching,
}: CalendarListProps) => {
  const { t } = useTranslation();
  const dateFormat =
    useSystemConfigStore((state) => state.settingsConfig?.dateFormat) ?? DEFAULT_DATE_FORMAT;

  const columns: TableColumn<CalendarData>[] = [
    {
      title:`${t('common.table_header.event_name')}`,
      field: 'name',
      Cell({ entry: { name } }) {
        return <>{name && name}</>;
      },
    },
    {
      title: `${t('common.table_header.year')}`,
      field: 'year',
    },
    {
      title: `${t('common.table_header.date')}`,
      field: 'date',
      Cell({ entry: { date } }) {
        return <>{date && dayjs(date).format(`${dateFormat}`)}</>;
      },
    },
    {
      title: `${t('common.table_header.day_type')}`,
      field: 'dayTypeName',
      Cell({ entry: { dayTypeName } }) {
        return (
          <span className="max-w-[500px] min-[1800px]:max-w-[900px] truncate block">
            {dayTypeName && dayTypeName}
          </span>
        );
      },
    },
    {
      title:`${t('common.table_header.active')}`,
      field: 'isActive',
      Cell({ entry: { isActive } }) {
        return <ActiveIndicator isActive={isActive} />;
      },
    },
    {
      title: `${t('common.table_header.action')}`,
      field: 'id',
      Cell({ entry }) {
        return (
          <div className="flex gap-x-2">
            <UpdateCalendar data={entry} />
            <DeleteCalendar data={entry} />
          </div>
        );
      },
    },
  ];

  return (
    <Table<CalendarData>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default CalendarsList;
