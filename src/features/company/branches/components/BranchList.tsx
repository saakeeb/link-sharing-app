import { Table } from '@/components/Elements';
import { Branch } from '../types';
import { TableColumn } from '@/types';
import DeleteBranch from './DeleteBranch';
import UpdateBranch from './UpdateBranch';
import ActiveIndicator from '@/components/Elements/ActiveIndicator/ActiveIndicator';
import { useTranslation } from 'react-i18next';

type BranchListProps = {
  dataSources: Branch[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};
const BranchList = ({ dataSources: data, onRefresh, isLoading, isFetching }: BranchListProps) => {
  const { t } = useTranslation();

  const columns: TableColumn<Branch>[] = [
    {
      title: `${t('common.table_header.branch')}`,
      field: 'name',
    },
    {
      title: `${t('common.table_header.parent')}`,
      field: 'parentName',
      Cell({ entry: { parentName } }) {
        return <>{parentName && parentName}</>;
      },
    },
    {
      title: `${t('common.table_header.email')}`,
      field: 'email',
    },
    {
      title: `${t('common.table_header.mobile_no')}`,
      field: 'mobileNo',
    },
    {
      title: `${t('common.table_header.address')}`,
      field: 'address',
      Cell({ entry: { address } }) {
        return <>{address && address}</>;
      },
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
      Cell({ entry }) {
        return (
          <div className="flex gap-x-2">
            <UpdateBranch data={entry} />
            <DeleteBranch data={entry} />
          </div>
        );
      },
    },
  ];

  return (
    <Table<Branch>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default BranchList;
