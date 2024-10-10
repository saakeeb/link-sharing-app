import { useEffect, useState } from 'react';
import { getUser } from '@/features/auth';
import { useUser } from '@/lib/auth';
import { Tab } from '../../routes/Profile';
import OverviewTab from './OverviewTab';
import PasswordTab from './PasswordTab';
import SettingsTab from './SettingsTab';

interface TabContentContainerProps {
  selectedTab: Tab;
}

const TabContentContainer = ({ selectedTab }: TabContentContainerProps) => {
  const { isError, data: user, error } = useUser();
  const [userData, setUserData] = useState(user);

  const getUpdateUser = async () => {
    const data = await getUser();
    setUserData(data);
  };
  useEffect(() => {
    getUpdateUser();
  }, [selectedTab, user]);

  let content;
  switch (selectedTab) {
    case 'Settings':
      content = <SettingsTab dataSources={userData} />;
      break;
    case 'Password':
      content = <PasswordTab />;
      break;
    default:
      content = <OverviewTab dataSources={userData} />;
      break;
  }

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading user: {message}</div>;
  }

  return (
    <div className="h-full p-[30px]">
      <>{content}</>
    </div>
  );
};

export default TabContentContainer;
