import React, { memo } from 'react';

import { ContentLayout } from '@/components/layouts';
import { WhiteBG } from '@/components/ui/white-bg/white-bg';
import { LinkView } from '@/features/links-page/components/leftside';
import { Authorization, ROLES } from '@/lib/authorization';

import { ProfileInfo } from '../components/profile-info';

export const ProfileUpdate = memo(() => {
  return (
    <ContentLayout title="Customize Your ProfileUpdate">
      <div className="w-full">
        <Authorization
          forbiddenFallback={<div>Only Admin Can View This</div>}
          allowedRoles={[ROLES.ADMIN]}
        >
          <div className="flex items-start justify-center gap-6 lg:justify-between">
            <div className="hidden size-full lg:block w-2/5">
              <WhiteBG>
                <LinkView />
              </WhiteBG>
            </div>
            <div className="size-full lg:w-3/5">
              <ProfileInfo />
            </div>
          </div>
        </Authorization>
      </div>
    </ContentLayout>
  );
});
ProfileUpdate.displayName = 'ProfileUpdate';
