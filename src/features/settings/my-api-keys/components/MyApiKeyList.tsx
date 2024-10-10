import { useState } from 'react';
import dayjs from 'dayjs';
import { VscCopy } from 'react-icons/vsc';
import { Table } from '@/components/Elements';
import { TableColumn } from '@/types';
import { ApiKey } from '../types';
import { useSystemConfigStore } from '@/stores/SystemConfigStore';
import { DEFAULT_DATE_TIME_FORMAT } from '@/utils/constants';
import ActiveIndicator from '@/components/Elements/ActiveIndicator/ActiveIndicator';
import DeleteApiKey from './DeleteApiKey';
import UpdateApiKey from './UpdateApiKey';
import { useTranslation } from 'react-i18next';

type ApiKeyListProps = {
  dataSources: ApiKey[];
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
};

const MyApiKeyList = ({ dataSources: data, onRefresh, isLoading, isFetching }: ApiKeyListProps) => {
  const { t } = useTranslation();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const dateTimeFormat =
    useSystemConfigStore((state) => state.settingsConfig?.dateTimeFormat) ??
    DEFAULT_DATE_TIME_FORMAT;

  const handleCopyClick = (key?: string) => {
    if (key) {
      navigator.clipboard.writeText(key);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2000);
    }
  };

  const columns: TableColumn<ApiKey>[] = [
    {
      title: `${t('common.table_header.name')}`,
      field: 'name',
      Cell({ entry: { name } }) {
        return <>{name && name}</>;
      },
    },
    {
      title: `${t('common.table_header.key')}`,
      field: 'key',
      Cell({ entry: { key } }) {
        return (
          <div className="flex items-center">
            <span className="max-w-[500px] min-[1800px]:max-w-[900px] truncate block">
              {key && key}
            </span>
            <button className="ml-2" onClick={() => handleCopyClick(key)}>
              <VscCopy className="h-5 w-5" />
            </button>
          </div>
        );
      },
    },
    {
      title:  `${t('common.table_header.created_at')}`,
      field: 'createdAt',
      Cell: ({ entry }) => <>{dayjs(entry.createdAt).format(`${dateTimeFormat}`)}</>,
    },
    {
      title: `${t('common.table_header.active')}`,
      field: 'isActive',
      Cell({ entry: { isActive } }) {
        return <ActiveIndicator isActive={isActive ? isActive : true} />;
      },
    },
    {
      title: `${t('common.table_header.action')}`,
      field: 'id',
      Cell({ entry }) {
        return (
          <div className="flex gap-x-2">
            <DeleteApiKey data={entry} />
            <UpdateApiKey data={entry} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      {copiedKey && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-md">
          Copied: {copiedKey}
        </div>
      )}
      <Table<ApiKey>
        data={data}
        onRefresh={onRefresh}
        isLoading={isLoading}
        isFetching={isFetching}
        columns={columns}
      />
    </>
  );
};

export default MyApiKeyList;
