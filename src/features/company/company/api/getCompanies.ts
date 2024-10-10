import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { Company, CompanyDTO } from '../types';

const COMPANY_URL = '/app/companies/';

export const getCompany = async (): Promise<Company[]> => {
  try {
    const { data } = await axios.get<CompanyDTO[]>(COMPANY_URL);
    const company = data.map((companyDto: CompanyDTO) => {
      const {
        id,
        name,
        logo,
        url,
        address,
        email,
        mobile_no: mobileNo,
        phone_no: phoneNo,
        slogan,
        currency,
        country,
        state,
        city,
        language,
        is_active: isActive,
        created_at: createdAt,
      } = companyDto;

      return {
        id,
        name,
        logo,
        url,
        address,
        email,
        mobileNo,
        phoneNo,
        slogan,
        currency,
        city,
        country,
        state,
        language,
        isActive,
        createdAt,
      };
    });

    return company;
  } catch (error) {
    console.error('Error occurred while fetching company:', error);
    throw new Error('Failed to fetch company');
  }
};

type QueryFnType = typeof getCompany;

type UseCompanyOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCompany = ({ config }: UseCompanyOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['companies'],
    queryFn: () => getCompany(),
  });
};
