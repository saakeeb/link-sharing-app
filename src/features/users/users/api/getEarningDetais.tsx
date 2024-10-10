import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { TotalEarnings, TotalEarningsDTO } from '../types';

const USER_EARNING_STATUS_URL = '/app/users-earning-status/';

export const getTotalEarnings = async (): Promise<TotalEarnings> => {
  try {
    const { data } = await axios.get<TotalEarningsDTO>(USER_EARNING_STATUS_URL);

    const {
      today_earning: todayEarning,
      today_ticket_sold: todayTicketSold,
      yesterday_earning: yesterdayEarning,
      total_earning: totalEarning,
    } = data;

    return {
      todayEarning,
      todayTicketSold,
      yesterdayEarning,
      totalEarning,
    };
  } catch (error) {
    console.error('Error occurred while fetching total earnings:', error);
    throw new Error('Failed to fetch total earnings');
  }
};

type QueryFnType = typeof getTotalEarnings;

type UseTotalEarningsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTotalEarnings = ({ config }: UseTotalEarningsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['total-earnings'],
    queryFn: () => getTotalEarnings(),
    ...config,
  });
};
