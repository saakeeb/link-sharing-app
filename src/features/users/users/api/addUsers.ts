import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { User, UserDTO } from '../types';

const ADD_USER_URL = '/app/users/create/';

const addUsers = async (user: User): Promise<User> => {
  try {
    const userDto: UserDTO = {
      id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      password: user.password,
      is_active: user.isActive,
      created_at: user.createdAt,
      groups: user.groups,
      userextended: {
        company: user.company,
        bio: user.bio,
        gender: user.gender,
        designation: user.designation,
        mobile_no: user.mobileNo,
        phone_no: user.phoneNo,
        address: user.address,
      },
    };
    if (user.photo) {
      userDto.userextended.photo_path = user.photo;
    }

    const { data } = await axios.post<UserDTO>(ADD_USER_URL, userDto);

    const userData: User = {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      isActive: data.is_active,
      createdAt: data.created_at,
      userGroups: data.user_groups,
      groups: data.groups,
      photo: data.userextended.photo,
      bio: data.userextended.bio,
      designation: data.userextended.designation,
      designationTitle: data.userextended.designation_title,
      gender: data.userextended.gender,
      genderName: data.userextended.gender_name,
      mobileNo: data.userextended.mobile_no,
      phoneNo: data.userextended.phone_no,
      address: data.userextended.address,
      company: data.userextended.company,
      country: data.userextended.country,
      countryName: data.userextended.country,
      language: data.userextended.language,
      languageName: data.userextended.language_name,
      currencyName: data.userextended.currency_name,
      currencySymbol: data.userextended.currency_symbol,
      timeZone: data.userextended.time_zone,
    };

    return userData;
  } catch (error) {
    console.error('Error occurred while adding user:', error);
    throw new Error('Failed to add user');
  }
};

type UseAddUserOptions = {
  config?: MutationConfig<typeof addUsers>;
};

export const useAddUser = ({ config }: UseAddUserOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: addUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      addNotification({
        type: 'success',
        title: 'User has been added successfully.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error adding user',
        message: error.message || 'There was an error attempting to add the user.',
      });
    },
    ...config,
  });
};
