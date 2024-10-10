import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentLayout } from '@/components/Layout';
import { useUser } from '@/lib/auth';
import TabContentContainer from '../components/profile/TabContentContainer';
import ProfileSummary from '../components/profile/ProfileSummary';
export type Tab = 'Overview' | 'Settings' | 'Password';

export const Profile = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<Tab>('Overview');
  const user = useUser();

  if (!user.data) {
    return null;
  }

  return (
    <ContentLayout title={t('navigation.profile.account_overview')} showTitle>
      <div className="mt-4 w-full">
        <div className="rounded-md overflow-hidden">
          <ProfileSummary selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
        <div className="h-fit mb-2 mt-[30px] bg-white rounded-md">
          <TabContentContainer selectedTab={selectedTab} />
        </div>
      </div>
    </ContentLayout>
  );
};
