import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TableSkeleton from '@/components/Skeletons/TableSkeleton/TableSkeleton';
import { Pagination } from '../Pagination/Pagination';
import { useSystemConfigStore } from '@/stores/SystemConfigStore';
import { DEFAULT_SORT_FORMAT } from '@/utils/constants';

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  isFetching: boolean;
  isLoading: boolean;
  columns: TableColumn<Entry>[];
  pagination?: boolean;
  isSelectAll?: boolean;
  isCheckAble?: boolean;
  isHideDefaultSelect?: boolean;
  onRefresh?: () => void;
  handleCheckedSubscriptionMember?: (memberId: any) => void;
};

export const totalPerPageOptions = [10, 15, 20, 25, 50] as const;

export const Table = <
  Entry extends {
    haveSubscription?: any;
    createdAt: Date;
    id: string | number;
  }
>({
  data,
  isFetching,
  isLoading,
  columns,
  pagination = true,
  isSelectAll = false,
  isCheckAble = false,
  isHideDefaultSelect = false,
  onRefresh,
  handleCheckedSubscriptionMember,
}: TableProps<Entry>) => {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItemsPerPage, setTotalItemsPerPage] = useState<number>(totalPerPageOptions[0]);
  const [totalItems, setTotalItems] = useState(data?.length || 0);
  const sortFormat =
    useSystemConfigStore((state) => state.settingsConfig?.sortBy) ?? DEFAULT_SORT_FORMAT;

  useEffect(() => {
    setTotalItems(data?.length);
    setStartIndex(0);
  }, [data, setTotalItems]);

  const handleRowCheckboxChange = (id: string) => {
    setSelectedItems((prevSelectedItems: string[]) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  };

  const handleSelectAllCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(
        data.slice(startIndex, startIndex + totalItemsPerPage).map((item) => item.id + '')
      );
    } else {
      setSelectedItems([]);
    }
  };

  useEffect(() => {
    setSelectedItems([]);
    if (isSelectAll && checkboxRef.current) {
      checkboxRef.current.checked = true;
      handleSelectAllCheckboxChange({
        target: checkboxRef.current,
      } as React.ChangeEvent<HTMLInputElement>);
    }

    if (isCheckAble && data && data.length > 0) {
      data.forEach((singleRow) => {
        if (singleRow.haveSubscription) {
          handleRowCheckboxChange(singleRow.id.toString());
        }
      });
    }
  }, [data, isSelectAll]);

  const sortedData =
    sortFormat === 'DESC'
      ? [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : [...data].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return (
    <>
      <div className="flex flex-col border border-[#d9d9d9] rounded-[6px]">
        <div className="overflow-x-auto">
          <div className={`inline-block min-w-full align-middle ${pagination ? 'pb-2' : ''}`}>
            <div className="overflow-hidden sm:rounded-5px">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-secondary-yellow">
                  <tr>
                    {!isHideDefaultSelect && (
                      <th className="w-10 px-2">
                        <input
                          ref={checkboxRef}
                          type="checkbox"
                          className="checkbox-style"
                          checked={
                            data?.length > 0 &&
                            data.slice(startIndex, startIndex + totalItemsPerPage).length ===
                              selectedItems.length
                          }
                          onChange={handleSelectAllCheckboxChange}
                        />
                      </th>
                    )}
                    {columns.map((column, index) => (
                      <th
                        key={column.title + index}
                        scope="col"
                        className="px-4 py-3 text-xs font-bold tracking-wider text-left text-primary-dark-gray uppercase last:text-right whitespace-nowrap"
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isFetching || isLoading ? (
                    <tr>
                      <td
                        colSpan={columns.length + 1}
                        className="text-center px-2 py-2 border-x-0 border-y-0 border-b border-b-[#d9d9d9]"
                      >
                        <TableSkeleton />
                      </td>
                    </tr>
                  ) : sortedData?.length > 0 ? (
                    sortedData
                      .slice(startIndex, startIndex + totalItemsPerPage)
                      .map((entry, entryIndex) => (
                        <tr
                          key={entry?.id || entryIndex}
                          className={`${
                            selectedItems?.includes(entry?.id?.toString() || entryIndex?.toString())
                              ? 'bg-secondary-blue'
                              : 'bg-white'
                          } hover:bg-secondary-blue border-x-0 border-y-0 border-b border-b-[#d9d9d9]`}
                        >
                          {!isHideDefaultSelect && (
                            <td className="w-10 px-2 text-center">
                              <input
                                type="checkbox"
                                className="checkbox-style"
                                checked={selectedItems.includes(entry.id + '')}
                                onChange={() => {
                                  handleRowCheckboxChange(entry.id + '');
                                  if (isCheckAble) {
                                    handleCheckedSubscriptionMember?.(entry?.id);
                                  }
                                }}
                              />
                            </td>
                          )}
                          {columns.map(({ Cell, field, title }, columnIndex) => (
                            <td
                              key={title + columnIndex}
                              className="p-4 text-sm font-medium first:text-gray-900 text-primary-dark-gray whitespace-nowrap last:flex last:flex-row-reverse"
                            >
                              {Cell ? <Cell entry={entry} /> : `${entry[field]}`}
                            </td>
                          ))}
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length + 1}
                        className="text-center p-4 border border-transparent border-b-[#d9d9d9]"
                      >
                        {t('messages.info.no_record_found')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {pagination && (
                <Pagination
                  startIndex={startIndex}
                  setStartIndex={setStartIndex}
                  totalItems={totalItems}
                  totalItemsPerPage={totalItemsPerPage}
                  setTotalItemsPerPage={setTotalItemsPerPage}
                  onRefresh={onRefresh}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
