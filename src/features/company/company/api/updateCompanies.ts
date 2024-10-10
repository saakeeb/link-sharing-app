import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Company, CompanyDTO } from '../types';

const UPDATE_COMPANY_URL = (id: number) => `/app/companies/${id}/`;

const updateCompany = async (company: Company): Promise<Company> => {
  try {
    const companyDto: CompanyDTO = {
      id: company.id,
      name: company.name,
      url: company.url,
      address: company.address,
      email: company.email,
      mobile_no: company.mobileNo,
      phone_no: company.phoneNo,
      slogan: company.slogan,
      currency: company.currency,
      country: company.country,
      state: company.state,
      city: company.city,
      language: company.language,
      is_active: company.isActive,
      created_at: company.createdAt,
    };
    if (company.logo) {
      companyDto.logo_path = company.logo;
    }

    const { data } = await axios.patch<CompanyDTO>(UPDATE_COMPANY_URL(company.id), companyDto);

    const companyData: Company = {
      id: data.id,
      name: data.name,
      logo: data.logo,
      url: data.url,
      address: data.address,
      email: data.email,
      mobileNo: data.mobile_no,
      phoneNo: data.phone_no,
      slogan: data.slogan,
      currency: data.currency,
      country: data.country,
      state: data.state,
      city: data.city,
      language: data.language,
      isActive: data.is_active,
      createdAt: data.created_at,
    };

    return companyData;
  } catch (error) {
    console.error('Error occurred while updating company:', error);
    throw new Error('Failed to update company');
  }
};

type UseUpdateCompanyOptions = {
  config?: MutationConfig<typeof updateCompany>;
};

export const useUpdateCompany = ({ config }: UseUpdateCompanyOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      addNotification({
        type: 'success',
        title: 'Your changes have been successfully saved.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating company',
        message: error.message || 'There was an error attempting to update the company.',
      });
    },
    ...config,
  });
};
