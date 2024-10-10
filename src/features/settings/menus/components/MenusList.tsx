import { CiImageOn } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';
import ActiveIndicator from '@/components/Elements/ActiveIndicator/ActiveIndicator';
import { Table } from '@/components/Elements';
import { TableColumn } from '@/types';
import { Menu } from '../types';
import DeleteMenu from './DeleteMenu';
import UpdateMenu from './UpdateMenu';

type MenuListProps = {
  dataSources: Menu[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

export const MenusList = ({
  dataSources: data,
  onRefresh,
  isLoading,
  isFetching,
}: MenuListProps) => {
  const { t } = useTranslation();

  const columns: TableColumn<Menu>[] = [
    {
      title: t('common.form_label.name'),
      field: 'name',
      Cell({ entry: { icon, name } }) {
        return (
          <div className="flex items-center justify-start gap-x-[10px]">
            {icon ? (
              <img
                src={icon}
                alt="menu"
                className="min-w-[30px] max-w-[30px] h-[30px] rounded-full overflow-hidden"
              />
            ) : (
              <CiImageOn className="w-[30px] h-[30px] rounded-full bg-gray-500 text-white p-1" />
            )}
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      title: t('common.form_label.code'),
      field: 'code',
      Cell: ({ entry: { code } }) => <>{code && code}</>,
    },
    {
      title: t('common.form_label.parent'),
      field: 'parentName',
      Cell: ({ entry: { parentName } }) => <>{parentName && parentName}</>,
    },
    {
      title: t('common.form_label.route'),
      field: 'route',
      Cell({ entry: { route } }) {
        return (
          <span className="max-w-[500px] min-[1800px]:max-w-[900px] truncate block">
            {route && route}
          </span>
        );
      },
    },
    {
      title: t('common.form_label.serial_no'),
      field: 'serialNo',
    },
    {
      title: t('common.table_header.active'),
      field: 'isActive',
      Cell: ({ entry: { isActive } }) => <ActiveIndicator isActive={isActive} />,
    },
    {
      title: t('common.table_header.action'),
      field: 'id',
      Cell({ entry }) {
        return (
          <div className="flex gap-x-2">
            <UpdateMenu data={entry} />
            <DeleteMenu data={entry} />
          </div>
        );
      },
    },
  ];

  return (
    <Table<Menu>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};
