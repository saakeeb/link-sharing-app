import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FaUser } from 'react-icons/fa';
import { FaMobileAlt } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { IoTicketOutline } from 'react-icons/io5';

import designation_icon from '@/assets/svgs/designation.svg';
import location_icon from '@/assets/svgs/location.svg';
import { useUserStore } from '@/stores/userStore';

import { Tab } from '../../routes/Profile';

import InfoCard from './InfoCard';

// import { useTotalEarnings } from '../../api/getEarningDetais';

interface ProfileSummaryProps {
  selectedTab: Tab;
  setSelectedTab: React.Dispatch<React.SetStateAction<Tab>>;
}

const ProfileSummary = ({ selectedTab, setSelectedTab }: ProfileSummaryProps) => {
  const { t } = useTranslation();
  // const { isLoading, data: earnings } = useTotalEarnings();
  const profile = useUserStore((state) => state.user);

  // if (isLoading) return null;

  return (
    <div className="h-full min-h-[273px] flex flex-col justify-center 2xl:justify-between p-[30px] pb-0 bg-white">
      <div className="w-full flex flex-col lg:flex-row 2xl:items-center justify-center lg:justify-between gap-5">
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-start lg:justify-center xl:justify-start items-center sm:items-start lg:items-center gap-y-5 sm:gap-x-10 sm:gap-y-0">
          <div className="relative rounded-full min-w-[165px] max-w-[165px] lg:w-[150px] xl:w-[165px] h-[165px] lg:h-[150px] xl:h-[165px] object-cover">
            {profile && profile?.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt="profile"
                className="w-[165px] lg:w-[150px] xl:w-[165px] h-[165px] lg:h-[150px] xl:h-[165px] rounded-full overflow-hidden"
              />
            ) : profile?.firstName ? (
              <div className="w-[165px] lg:w-[150px] xl:w-[165px] h-[165px] lg:h-[150px] xl:h-[165px] text-[100px] font-semibold rounded-full flex items-center justify-center bg-gray-400 text-white">
                {profile?.firstName[0].toUpperCase()}
              </div>
            ) : (
              <FaUser className="min-w-[165px] lg:w-[150px] xl:w-[165px] h-[165px] lg:h-[150px] xl:h-[165px] p-4 border rounded-full bg-gray-500 text-white" />
            )}
          </div>
          <div>
            <p className="font-bold text-xl mb-[10px]">
              {profile?.firstName} {profile?.lastName}
            </p>
            <div className="flex flex-col items-start gap-x-6 gap-y-2">
              {profile?.designationTitle && (
                <div className="flex gap-x-2 items-center">
                  <img src={designation_icon} alt="designation" />
                  <p>{profile.designationTitle}</p>
                </div>
              )}
              {profile?.address && (
                <div className="flex gap-x-2 items-center">
                  <img src={location_icon} alt="designation" />
                  <p>{profile.address}</p>
                </div>
              )}
            </div>
            {profile?.mobileNo && (
              <div className="mt-2 flex gap-x-2 items-center">
                <div className="rounded-full bg-[#ECECEC] h-[22px] w-[22px] flex items-center justify-center">
                  <FaMobileAlt className="h-[11px]" />
                </div>
                <p>{profile.mobileNo}</p>
              </div>
            )}
          </div>
        </div>

        <div className="2xl:my-0 my-10 grid grid-cols-2 3xl:grid-cols-4 justify-start 2xl:justify-end flex-wrap gap-3">
          {/* <InfoCard
            label={t('navigation.profile.today_earning')}
            amount={earnings?.todayEarning}
            icon={GiMoneyStack}
          /> */}
          {/* <InfoCard
            label={t('navigation.profile.yesterday_earning')}
            amount={earnings?.yesterdayEarning}
            icon={GiMoneyStack}
          /> */}
          {/* <InfoCard
            label={t('navigation.profile.total_earning')}
            amount={earnings?.totalEarning}
            icon={GiMoneyStack}
          />
          <InfoCard
            label={t('navigation.profile.today_ticket_sold')}
            amount={earnings?.todayTicketSold}
            icon={IoTicketOutline}
          /> */}
        </div>
      </div>
      <div className="flex gap-x-4 md:gap-x-10 lg:gap-x-14 items-baseline">
        <button className="w-fit text-center" onClick={() => setSelectedTab('Overview')}>
          <p
            className={clsx('font-bold text-black', {
              'text-primary-turquoise': selectedTab === 'Overview',
            })}
          >
            {t('navigation.profile.overview')}
          </p>
          <div
            className={clsx('mt-[14px] w-[100px] h-1 rounded-md', {
              'bg-primary-turquoise': selectedTab === 'Overview',
            })}
          ></div>
        </button>
        <button className="w-fit text-center" onClick={() => setSelectedTab('Settings')}>
          <p
            className={clsx('font-bold text-black', {
              'text-primary-turquoise': selectedTab === 'Settings',
            })}
          >
            {t('navigation.profile.settings')}
          </p>
          <div
            className={clsx('mt-[14px] w-[100px] h-1 rounded-md', {
              'bg-primary-turquoise': selectedTab === 'Settings',
            })}
          ></div>
        </button>
        <button className="w-fit text-center" onClick={() => setSelectedTab('Password')}>
          <p
            className={clsx('font-bold text-black', {
              'text-primary-turquoise': selectedTab === 'Password',
            })}
          >
            {t('navigation.profile.password')}
          </p>
          <div
            className={clsx('mt-[14px] w-[100px] h-1 rounded-md', {
              'bg-primary-turquoise': selectedTab === 'Password',
            })}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default ProfileSummary;
