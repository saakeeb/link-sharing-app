import { axios } from '@/lib/axios';
import { AuthUser } from '@/types';

const AUTH_ME = '/app/users/me/';

export const getUser = async (): Promise<AuthUser> => {
  try {
    const response: any = await axios.get(AUTH_ME);
    const responseData = response.data;

    const user: AuthUser = {
      id: responseData.id,
      email: responseData.email,
      firstName: responseData.first_name,
      lastName: responseData.last_name,
      photoUrl: responseData.userextended.photo,
      bio: responseData.userextended.bio,
      designation: responseData.userextended.designation,
      designationTitle: responseData.userextended.designation_title,
      organization: responseData.userextended.organization,
      mobileNo: responseData.userextended.mobile_no,
      phoneNo: responseData.userextended.phone_no,
      user_groups: responseData.user_groups,
      groups: responseData.groups,
      shift_name: responseData.shift_name,
      shift_start_time: responseData.shift_start_time,
      shift_end_time: responseData.shift_end_time,
      country: responseData.userextended.country,
      countryName: responseData.userextended.country_name,
      state: responseData.userextended.state,
      city: responseData.userextended.city,
      address: responseData.userextended.address,
      gender: responseData.userextended.gender,
      genderName: responseData.userextended.gender_name,
      language: responseData.userextended.language,
      languageName: responseData.userextended.language_name,
      timeZone: responseData.userextended.time_zone,
      currencyName: responseData.userextended.currency_name,
      currencySymbol: responseData.userextended.currency_symbol,
      company: responseData.userextended.company,
      companyName: responseData.userextended.company_name,
      role: responseData.user_groups[0],
    };

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Failed to login');
  }
};
