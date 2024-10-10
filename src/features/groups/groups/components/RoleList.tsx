import dayjs from 'dayjs';
import { Table } from '@/components/Elements';
import ActiveIndicator from '@/components/Elements/ActiveIndicator/ActiveIndicator';
import { useSystemConfigStore } from '@/stores/SystemConfigStore';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/constants';
import { TableColumn } from '@/types';
import { Role } from '../types';
import DeleteRole from './DeleteRole';
import UpdateRole from './UpdateRole';
import { useTranslation } from 'react-i18next';

type RoleListProps = {
  dataSources: Role[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

const RolesList = ({ dataSources: data, onRefresh, isLoading, isFetching }: RoleListProps) => {
  const { t } = useTranslation();
  const dateTimeFormat =
    useSystemConfigStore((state) => state.settingsConfig?.dateTimeFormat) ??
    DEFAULT_DATE_TIME_FORMAT;

  const columns: TableColumn<Role>[] = [
    {
      title: `${t('common.table_header.name')}`,
      field: 'name',
    },
    {
      title:  `${t('common.table_header.code')}`,
      field: 'code',
    },
    {
      title: `${t('common.table_header.created_at')}`,
      field: 'createdAt',
      Cell: ({ entry }) => <>{dayjs(entry.createdAt).format(`${dateTimeFormat}`)}</>,
    },
    {
      title: `${t('common.table_header.active')}`,
      field: 'isActive',
      Cell({ entry: { isActive } }) {
        return <ActiveIndicator isActive={isActive} />;
      },
    },
    {
      title: `${t('common.table_header.action')}`,
      field: 'id',
      Cell: ({ entry }) => (
        <div className="flex gap-x-2">
          <UpdateRole data={entry} />
          <DeleteRole data={entry} />
        </div>
      ),
    },
  ];
  return (
    <Table<Role>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default RolesList;
