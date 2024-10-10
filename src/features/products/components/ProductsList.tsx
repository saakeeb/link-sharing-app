import { useTranslation } from 'react-i18next';

import { Table } from '@/components/Elements';
import { TableColumn } from '@/types';

import { Product } from '../types';

type ProductListProps = {
  dataSources: Product[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

const ProductsList = ({
  dataSources: data,
  onRefresh,
  isLoading,
  isFetching,
}: ProductListProps) => {
  const { t } = useTranslation();

  const columns: TableColumn<Product>[] = [
    {
      title: `Id`,
      field: 'id',
    },
    {
      title: `Name`,
      field: 'name',
    },
    {
      title: `Maintenance Time`,
      field: 'maintenance_time',
    },
  ];

  return (
    <Table<Product>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default ProductsList;
