import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Table } from '@/components/Elements';
import { useSystemConfigStore } from '@/stores/SystemConfigStore';
import { TableColumn } from '@/types';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/constants';

import { MaintenancePlan } from '../types';

type MaintenanceReportListProps = {
  dataSources: MaintenancePlan[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

const MaintenanceReportList = ({
  dataSources: data,
  onRefresh,
  isLoading,
  isFetching,
}: MaintenanceReportListProps) => {
  const { t } = useTranslation();

  const dateTimeFormat =
    useSystemConfigStore((state: any) => state.settingsConfig?.dateTimeFormat) ??
    DEFAULT_DATE_TIME_FORMAT;

  const columns: TableColumn<MaintenancePlan>[] = [
    {
      title: `Id`,
      field: 'id',
    },
    {
      title: `Contract Id`,
      field: 'contract_id',
    },
    {
      title: `Visit No`,
      field: 'visit_no',
    },
    {
      title: `Planned Date`,
      field: 'planned_date',
      Cell: ({ entry }) => <>{dayjs(entry.planned_date).format(`${dateTimeFormat}`)}</>,
    },
    {
      title: `Day Correction`,
      field: 'day_correction',
      Cell: ({ entry }) => <>{dayjs(entry.day_correction).format(`${dateTimeFormat}`)}</>,
    },
  ];

  return (
    <Table<MaintenancePlan>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default MaintenanceReportList;
