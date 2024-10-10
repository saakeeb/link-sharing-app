import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentLayout } from '@/components/Layout';
import { Authorization, ROLES } from '@/lib/authorization';
import { useParkingSlots } from '../api/getParkingSlot';
import ParkingSlotConfig from '../components/ParkingSlotConfig';

export const ParkingSlot = () => {
  const { t } = useTranslation();
  const { isLoading, isError, data, error } = useParkingSlots();
  const [slot, setSlot] = useState<any>({});

  useEffect(() => {
    if (data) {
      setSlot(data[0]);
    }
  }, [data]);

  if (isError) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error loading parking slots: {message}</div>;
  }

  if (isLoading) return null;

  return (
    <ContentLayout title={t('common.title.manage_parking_slot')} showTitle>
      <div className="flex flex-col bg-white p-5 rounded-lg">
        <Authorization
          forbiddenFallback={<div>{t('common.errors.unauthorized')}</div>}
          allowedRoles={[ROLES.SUPER_ADMIN, ROLES.OWNER, ROLES.ADMIN, ROLES.OPERATOR]}
        >
          <ParkingSlotConfig data={slot} />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
