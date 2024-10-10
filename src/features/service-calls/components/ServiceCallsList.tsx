import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Table } from '@/components/Elements';
import { useSystemConfigStore } from '@/stores/SystemConfigStore';
import { TableColumn } from '@/types';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/constants';

import { ServiceCall } from '../types';

type ServiceCallListProps = {
  dataSources: ServiceCall[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

const ServiceCallsList = ({
  dataSources: data,
  onRefresh,
  isLoading,
  isFetching,
}: ServiceCallListProps) => {
  const { t } = useTranslation();

  const dateTimeFormat =
    useSystemConfigStore((state: any) => state.settingsConfig?.dateTimeFormat) ??
    DEFAULT_DATE_TIME_FORMAT;

  const columns: TableColumn<ServiceCall>[] = [
    {
      title: `Id`,
      field: 'id',
    },
    {
      title: `Contract Id`,
      field: 'contract_id',
    },
    {
      title: `Request Time`,
      field: 'request_time',
      Cell: ({ entry }) => <>{dayjs(entry.request_time).format(`${dateTimeFormat}`)}</>,
    },
    {
      title: `Response Time`,
      field: 'response_time',
      Cell: ({ entry }) => <>{dayjs(entry.response_time).format(`${dateTimeFormat}`)}</>,
    },
    {
      title: `Arrival Time`,
      field: 'arrival_time',
      Cell: ({ entry }) => <>{dayjs(entry.arrival_time).format(`${dateTimeFormat}`)}</>,
    },
    {
      title: `Resolve Time`,
      field: 'resolve_time',
      Cell: ({ entry }) => <>{dayjs(entry.arrival_time).format(`${dateTimeFormat}`)}</>,
    },
    {
      title: `Receiver`,
      field: 'receiver',
    },
    {
      title: `System`,
      field: 'system',
    },
    {
      title: `Serial No`,
      field: 'serial_no',
    },
    {
      title: `Complain`,
      field: 'complain',
      Cell: ({ entry }) => <>{entry.complain.replaceAll('_', ' ')}</>,
    },
    {
      title: `Call Class`,
      field: 'call_class',
      Cell: ({ entry }) => <>{entry.call_class.replaceAll('_', ' ')}</>,
    },
    {
      title: `Intervention`,
      field: 'intervention',
      Cell: ({ entry }) => <>{entry.intervention.replaceAll('_', ' ')}</>,
    },
    {
      title: `Section`,
      field: 'section',
    },
    {
      title: `Request`,
      field: 'request',
      Cell: ({ entry }) => <>{entry.request.replaceAll('_', ' ')}</>,
    },
    {
      title: `Root Cause`,
      field: 'root_cause',
      Cell: ({ entry }) => <>{entry.root_cause.replaceAll('_', ' ')}</>,
    },
    {
      title: `Status`,
      field: 'status',
      Cell: ({ entry }) => <>{entry.status.replaceAll('_', ' ')}</>,
    },
    {
      title: `Related Call`,
      field: 'related_call',
      Cell: ({ entry }) => (
        <>
          {entry.related_call !== null && entry.related_call !== undefined
            ? entry.related_call.replaceAll('_', ' ')
            : ''}
        </>
      ),
    },
    {
      title: `Customer Feedback`,
      field: 'customer_feedback',
    },
    {
      title: `Notes`,
      field: 'notes',
      Cell: ({ entry }) => (
        <>
          {entry.related_call !== null && entry.related_call !== undefined
            ? entry.related_call
            : ''}
        </>
      ),
    },
  ];

  return (
    <Table<ServiceCall>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default ServiceCallsList;
