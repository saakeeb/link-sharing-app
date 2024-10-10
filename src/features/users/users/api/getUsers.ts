import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { User, UserDTO } from '../types';

const USER_URL = 'app/users/';

export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await axios.get<UserDTO[]>(USER_URL);

    const users: User[] = data.map((userDto: UserDTO) => {
      const {
        id,
        email,
        first_name: firstName,
        last_name: lastName,
        is_active: isActive,
        user_groups: userGroups,
        created_at: createdAt,
        groups,
        userextended,
      } = userDto;

      const {
        photo: photo = '',
        bio = '',
        designation = '',
        designation_title: designationTitle = '',
        organization = '',
        mobile_no: mobileNo = '',
        phone_no: phoneNo = '',
        gender = '',
        country = '',
        country_name: countryName = '',
        language = '',
        language_name: languageName = '',
        currency_name: currencyName = '',
        currency_symbol: currencySymbol = '',
        state = '',
        city = '',
        address = '',
        time_zone: timeZone = '',
        company = 1,
      } = userextended || {};

      return {
        id,
        email,
        firstName,
        lastName,
        designation,
        designationTitle,
        createdAt,
        userGroups,
        groups,
        isActive,
        photo,
        bio,
        organization,
        gender,
        mobileNo,
        phoneNo,
        country,
        countryName,
        state,
        city,
        address,
        language,
        languageName,
        currencyName,
        currencySymbol,
        timeZone,
        company,
      };
    });

    return users;
  } catch (error) {
    console.error('Error occurred while fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

type QueryFnType = typeof getUsers;

type UseUsersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useUsers = ({ config }: UseUsersOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    ...config,
  });
};
