import React from 'react';
import { Table } from '@/components/Elements';
import { TableColumn } from '@/types';
import { Permission } from '../types';
import { useTranslation } from 'react-i18next';

type PermissionsListProps = {
  dataSources: Permission[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
  updatePermission?: (id: string | number, field: keyof Permission, value: boolean) => void;
};

const CheckboxCell: React.FC<{
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      defaultChecked={checked}
      onChange={onChange}
      className="bg-gray-200 hover:bg-gray-300 cursor-pointer w-5 h-5 border-3 border-black-500 rounded-sm checked:bg-primary-turquoise checked:hover:bg-primary-turquoise checked:focus:bg-primary-turquoise ml-0.5 focus:outline-0 focus:ring-0 focus:ring-offset-0"
    />
  );
};

const PermissionsList: React.FC<PermissionsListProps> = ({
  dataSources,
  isLoading,
  isFetching,
  onRefresh,
  updatePermission,
}) => {
  const { t } = useTranslation();
  const columns: TableColumn<Permission>[] = [
    {
      title: `${t('common.table_header.name')}`,
      field: 'name',
    },
    {
      title: `${t('common.table_header.read')}`,
      field: 'allowRead',
      Cell: ({ entry }) => (
        <CheckboxCell
          checked={entry.allowRead}
          onChange={() => {
            updatePermission && updatePermission(entry.id, 'allowRead', !entry.allowRead);
          }}
        />
      ),
    },
    {
      title: `${t('common.table_header.create')}`,
      field: 'allowCreate',
      Cell: ({ entry }) => (
        <CheckboxCell
          checked={entry.allowCreate}
          onChange={() =>
            updatePermission && updatePermission(entry.id, 'allowCreate', !entry.allowCreate)
          }
        />
      ),
    },
    {
      title: `${t('common.table_header.create')}`,
      field: 'allowUpdate',
      Cell: ({ entry }) => (
        <CheckboxCell
          checked={entry.allowUpdate}
          onChange={() =>
            updatePermission && updatePermission(entry.id, 'allowUpdate', !entry.allowUpdate)
          }
        />
      ),
    },
    {
      title:  `${t('common.table_header.delete')}`,
      field: 'allowDelete',
      Cell: ({ entry }) => (
        <CheckboxCell
          checked={entry.allowDelete}
          onChange={() =>
            updatePermission && updatePermission(entry.id, 'allowDelete', !entry.allowDelete)
          }
        />
      ),
    },
    {
      title: `${t('common.table_header.all')}`,
      field: 'allowAll',
      Cell: ({ entry }) => (
        <CheckboxCell
          checked={entry.allowAll}
          onChange={() =>
            updatePermission && updatePermission(entry.id, 'allowAll', !entry.allowAll)
          }
        />
      ),
    },
  ];

  return (
    <Table<Permission>
      data={dataSources}
      onRefresh={onRefresh}
      isHideDefaultSelect={true}
      pagination={false}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default PermissionsList;
