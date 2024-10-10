import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { User, UserDTO } from '../types';

const UPDATE_USER_URL = (id: number) => `/app/users/${id}/update/`;

const updateUser = async (user: User): Promise<User> => {
  try {
    const userDto: UserDTO = {
      id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      groups: user.groups,
      is_active: user.isActive,
      created_at: user.createdAt,
      userextended: {
        bio: user.bio,
        designation: user.designation,
        mobile_no: user.mobileNo,
        phone_no: user.phoneNo,
        address: user.address,
        company: user.company,
        gender: user.gender,
        city: user.city,
        state: user.state,
        country: user.country,
        language: user.language,
        time_zone: user.timeZone,
      },
    };
    if (user.photo) {
      userDto.userextended.photo_path = user.photo;
    }
    if (user.password) {
      userDto.password = user.password;
    }

    const { data } = await axios.patch<UserDTO>(UPDATE_USER_URL(userDto.id), userDto);

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
    console.error('Error occurred while updating user:', error);
    throw new Error('Failed to update user');
  }
};

type UseUpdateUserOptions = {
  config?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({ config }: UseUpdateUserOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      addNotification({
        type: 'success',
        title: 'Your changes have been successfully saved.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating user',
        message: error.message || 'There was an error attempting to update the user.',
      });
    },
    ...config,
  });
};
