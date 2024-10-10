import { useTranslation } from 'react-i18next';

import { Table } from '@/components/Elements';
import { TableColumn } from '@/types';

import { ContactSystem } from '../types';

type ContactSystemListProps = {
  dataSources: ContactSystem[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

const ContactSystemsList = ({
  dataSources: data,
  onRefresh,
  isLoading,
  isFetching,
}: ContactSystemListProps) => {
  const { t } = useTranslation();

  const columns: TableColumn<ContactSystem>[] = [
    {
      title: `Id`,
      field: 'id',
    },
    {
      title: `Contract Id`,
      field: 'contract_id',
    },
    {
      title: `System`,
      field: 'system',
    },
    {
      title: `Serial No`,
      field: 'serial_no',
    },
  ];

  return (
    <Table<ContactSystem>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default ContactSystemsList;
