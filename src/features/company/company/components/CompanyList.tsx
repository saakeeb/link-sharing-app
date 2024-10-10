import { CiImageOn } from 'react-icons/ci';
import { Table } from '@/components/Elements';
import { TableColumn } from '@/types';
import { Company } from '../types';
import UpdateCompany from './UpdateCompany';
import ActiveIndicator from '@/components/Elements/ActiveIndicator/ActiveIndicator';
import { useTranslation } from 'react-i18next';

type CompanyListProps = {
  dataSources: Company[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};
const CompaniesList = ({
  dataSources: data,
  onRefresh,
  isLoading,
  isFetching,
}: CompanyListProps) => {
  const { t } = useTranslation();

const columns: TableColumn<Company>[] = [
  {
    title:`${t('common.table_header.name')}`,
    field: 'name',
    Cell({ entry: { logo, name } }) {
      return (
        <div className="flex items-center justify-start gap-x-[10px]">
          {logo ? (
            <img
              src={logo}
              alt="company"
              className="w-[30px] h-[30px] rounded-full overflow-hidden object-cover"
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
    title: `${t('common.table_header.uRL')}`,
    field: 'url',
    Cell({ entry: { url } }) {
      return (
        <>
          {url && (
            <a className="text-blue-500" href={url} target="_blank">
              link
            </a>
          )}
        </>
      );
    },
  },
  {
    title: `${t('common.table_header.address')}`,
    field: 'address',
    Cell({ entry: { address } }) {
      return <>{address && address}</>;
    },
  },
  {
    title: `${t('common.table_header.mobile_no')}`,
    field: 'mobileNo',
    Cell({ entry: { mobileNo } }) {
      return <>{mobileNo && mobileNo}</>;
    },
  },
  {
    title: `${t('common.table_header.phone_no')}`,
    field: 'phoneNo',
    Cell({ entry: { phoneNo } }) {
      return <>{phoneNo && phoneNo}</>;
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
          <UpdateCompany data={entry} />
        </div>
      );
    },
  },
];


  return (
    <Table<Company>
      data={data}
      onRefresh={onRefresh}
      isLoading={isLoading}
      isFetching={isFetching}
      columns={columns}
    />
  );
};

export default CompaniesList;
