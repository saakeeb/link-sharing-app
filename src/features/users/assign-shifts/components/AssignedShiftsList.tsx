import { Table } from '@/components/Elements';
import { AssignedShift } from '../types';
import { formatTime } from '@/utils/format';
import { useSystemConfigStore } from '@/stores/SystemConfigStore';
import { DEFAULT_TIME_FORMAT } from '@/utils/constants';
import DeleteAssignedShift from './DeleteAssignedShift';
import UpdateAssignedShift from './UpdateAssignedShift';
import { TableColumn } from '@/types';
import ActiveIndicator from '@/components/Elements/ActiveIndicator/ActiveIndicator';
import { useTranslation } from 'react-i18next';

type AssignedShiftListProps = {
  dataSources: AssignedShift[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

const AssignedShiftsList = ({
  dataSources: data,
  onRefresh,
  isLoading,
  isFetching,
}: AssignedShiftListProps) => {
  const timeFormat =
    useSystemConfigStore((state) => state.settingsConfig?.timeFormat) ?? DEFAULT_TIME_FORMAT;
    const { t } = useTranslation();

  const columns: TableColumn<AssignedShift>[] = [
    {
      title:`${t('common.table_header.operator')}`,
      field: 'operatorName',
      Cell({ entry: { operatorName } }) {
        return <>{operatorName && operatorName}</>;
      },
    },
    {
      title: `${t('common.table_header.shift')}`,
      field: 'shiftName',
      Cell({ entry: { shiftName } }) {
        return <>{shiftName && shiftName}</>;
      },
    },

    {
      title: `${t('common.table_header.start_time')}`,
      field: 'startTime',
      Cell: ({ entry: { startTime } }) => (
        <>{startTime && `${formatTime(startTime, timeFormat)}`}</>
      ),
    },
    {
      title:`${t('common.table_header.end_time')}`,
      field: 'endTime',
      Cell: ({ entry: { endTime } }) => <>{endTime && `${formatTime(endTime, timeFormat)}`}</>,
    },
    {
      title: `${t('common.table_header.active')}`,
      field: 'isActive',
      Cell({ entry: { isActive } }) {
        return <ActiveIndicator isActive={isActive} />;
      },
    },
    {
      title:  `${t('common.table_header.action')}`,
      field: 'id',
      Cell({ entry }) {
        return (
          <div className="flex gap-x-2">
            <UpdateAssignedShift data={entry} />
            <DeleteAssignedShift data={entry} />
          </div>
        );
      },
    },
  ];
  return (
    <Table<AssignedShift>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default AssignedShiftsList;
