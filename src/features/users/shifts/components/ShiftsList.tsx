import { Table } from '@/components/Elements';
import { Shift } from '../types';
import { formatTime } from '@/utils/format';
import { useSystemConfigStore } from '@/stores/SystemConfigStore';
import { DEFAULT_TIME_FORMAT } from '@/utils/constants';
import DeleteShift from './DeleteShift';
import UpdateShift from './UpdateShift';
import { TableColumn } from '@/types';
import ActiveIndicator from '@/components/Elements/ActiveIndicator/ActiveIndicator';
import { useTranslation } from 'react-i18next';

type ShiftListProps = {
  dataSources: Shift[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

const columns: TableColumn<Shift>[] = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Code',
    field: 'code',
    Cell: ({ entry }) => <>{entry.code && entry.code}</>,
  },
  {
    title: 'Start time',
    field: 'startTime',
    Cell: ({ entry }) => <>{entry.startTime}</>,
  },
  {
    title: 'End Time',
    field: 'endTime',
    Cell: ({ entry }) => <>{entry.endTime}</>,
  },
  {
    title: 'Active',
    field: 'isActive',
    Cell: ({ entry }) => <>{<ActiveIndicator isActive={entry.isActive} />}</>,
  },
  {
    title: 'Action',
    field: 'id',
    Cell({ entry }) {
      return (
        <div className="flex gap-x-2">
          <UpdateShift data={entry} />
          <DeleteShift data={entry} />
        </div>
      );
    },
  },
];

const ShiftsList = ({ dataSources: data, onRefresh, isLoading, isFetching }: ShiftListProps) => {
  const { t } = useTranslation();
  const timeFormat =
    useSystemConfigStore((state) => state.settingsConfig?.timeFormat) ?? DEFAULT_TIME_FORMAT;

  const columns: TableColumn<Shift>[] = [
    {
      title: `${t('common.table_header.name')}`,
      field: 'name',
    },
    {
      title: `${t('common.table_header.code')}`,
      field: 'code',
      Cell: ({ entry }) => <>{entry.code && entry.code}</>,
    },
    {
      title:  `${t('common.table_header.start_time')}`,
      field: 'startTime',
      Cell: ({ entry: { startTime } }) => (
        <>{startTime && `${formatTime(startTime, timeFormat)}`}</>
      ),
    },
    {
      title: `${t('common.table_header.end_time')}`,
      field: 'endTime',
      Cell: ({ entry: { endTime } }) => <>{endTime && `${formatTime(endTime, timeFormat)}`}</>,
    },
    {
      title: `${t('common.table_header.active')}`,
      field: 'isActive',
      Cell: ({ entry }) => <>{<ActiveIndicator isActive={entry.isActive} />}</>,
    },
    {
      title: `${t('common.table_header.action')}`,
      field: 'id',
      Cell({ entry }) {
        return (
          <div className="flex gap-x-2">
            <UpdateShift data={entry} />
            <DeleteShift data={entry} />
          </div>
        );
      },
    },
  ];
  return (
    <Table<Shift>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default ShiftsList;
