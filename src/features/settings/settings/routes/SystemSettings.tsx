import { useEffect, useState } from 'react';
import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';
import { useSettings } from '../api/getSettings';
import SettingsOptions from '../components/SettingsOptions';
import { useTranslation } from 'react-i18next';

export const SystemSettings = () => {
  const { t } = useTranslation();
  const { isLoading, isError, data, error } = useSettings();

  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    if (data) {
      setSettings(data[0]);
    }
  }, [data]);

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading settings: {message}</div>;
  }

  if (isLoading) return null;

  return (
    <ContentLayout title={t('pages.system_configuration')} showTitle>
      <div className="flex flex-col bg-white p-5 rounded-lg">
        <Authorization
          forbiddenFallback={<div>{t('common.errors.unauthorized')}</div>}
          allowedRoles={[ROLES.SUPER_ADMIN, ROLES.OWNER]}
        >
          <SettingsOptions data={settings} />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
