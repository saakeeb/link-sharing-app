import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Table } from '@/components/Elements';
import { useSystemConfigStore } from '@/stores/SystemConfigStore';
import { TableColumn } from '@/types';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/constants';

import { Customer } from '../types';

type CustomerListProps = {
  dataSources: Customer[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

const CustomersList = ({
  dataSources: data,
  onRefresh,
  isLoading,
  isFetching,
}: CustomerListProps) => {
  const { t } = useTranslation();

  const dateTimeFormat =
    useSystemConfigStore((state: any) => state.settingsConfig?.dateTimeFormat) ??
    DEFAULT_DATE_TIME_FORMAT;

  const columns: TableColumn<Customer>[] = [
    {
      title: `Id`,
      field: 'id',
    },
    {
      title: `Customer Name`,
      field: 'customer_name',
    },
    {
      title: `Contract Date`,
      field: 'contract_date',
      Cell: ({ entry }) => <>{dayjs(entry.contract_date).format(`${dateTimeFormat}`)}</>,
    },
    {
      title: `Expiry Date`,
      field: 'expiry_date',
      Cell: ({ entry }) => <>{dayjs(entry.expiry_date).format(`${dateTimeFormat}`)}</>,
    },
    {
      title: `Renew Date`,
      field: 'renew_date',
      Cell: ({ entry }) => <>{dayjs(entry.renew_date).format(`${dateTimeFormat}`)}</>,
    },
    {
      title: `Maintenance Frequency`,
      field: 'maintenance_frequency',
    },
    {
      title: `Invoice Time`,
      field: 'invoice_time',
    },
    {
      title: `Contract Value`,
      field: 'contract_value',
    },
    {
      title: `City`,
      field: 'city',
    },
    {
      title: `Travel Time`,
      field: 'travel_time',
    },
  ];

  return (
    <Table<Customer>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default CustomersList;
