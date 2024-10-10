import { FaUser } from 'react-icons/fa';
import { Table } from '@/components/Elements';
import ActiveIndicator from '@/components/Elements/ActiveIndicator/ActiveIndicator';
import { TableColumn } from '@/types';
import { User } from '../types';
import { DeleteUser } from './DeleteUser';
import UpdateUser from './UpdateUser';
import { useTranslation } from 'react-i18next';

type UserListProps = {
  dataSources: User[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

const UsersList = ({ dataSources: data, onRefresh, isLoading, isFetching }: UserListProps) => {
  const { t } = useTranslation();

const columns: TableColumn<User>[] = [
  {
    title:  `${t('common.table_header.name')}`,
    field: 'firstName',
    Cell({ entry: { photo, firstName, lastName } }) {
      return (
        <div className="flex items-center justify-start gap-x-[10px]">
          {photo ? (
            <img
              src={photo}
              alt="user"
              className="w-[30px] h-[30px] rounded-full overflow-hidden object-cover"
            />
          ) : (
            <FaUser className="w-[30px] h-[30px] rounded-full bg-gray-500 text-white p-1" />
          )}
          <span>{`${firstName} ${lastName}`}</span>
        </div>
      );
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
    title:`${t('common.table_header.designation')}`,
    field: 'designationTitle',
    Cell({ entry: { designationTitle } }) {
      return <>{designationTitle && designationTitle}</>;
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
          <UpdateUser data={entry} />
          <DeleteUser data={entry} />
        </div>
      );
    },
  },
];


  return (
    <Table<User>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default UsersList;
