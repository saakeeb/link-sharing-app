import React, { memo, useEffect, useMemo } from 'react';

import { ContentLayout } from '@/components/layouts';
import { WhiteBG } from '@/components/ui/white-bg/white-bg';
import { useUser } from '@/lib/auth';
import { Authorization, ROLES } from '@/lib/authorization';
import { useUserInfo } from '@/stores/user-store';

import { LinkView } from '../components/leftside';
import { LinkCreate } from '../components/link-create';

export const Links = memo(() => {
  const user = useUser();
  const existingProfile = useUserInfo((state) => state.userInfo);
  const updateUserInfo = useUserInfo((state) => state.updateUserInfo);

  const userInfo = useMemo(() => {
    if (user?.data) {
      return {
        ...existingProfile,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        email: user.data.email,
      };
    }
    return null;
  }, [user, existingProfile]);

  useEffect(() => {
    if (userInfo) {
      updateUserInfo(userInfo);
    }
  }, [updateUserInfo]);

  return (
    <ContentLayout title="Customize Your Links">
      <div className="w-full">
        <Authorization
          forbiddenFallback={<div>Only Admin Can View This</div>}
          allowedRoles={[ROLES.ADMIN]}
        >
          <div className="flex items-start justify-center gap-6 lg:justify-between">
            <div className="hidden size-full w-2/5 lg:block">
              <WhiteBG>
                <LinkView />
              </WhiteBG>
            </div>
            <div className="size-full lg:w-3/5">
              <LinkCreate />
            </div>
          </div>
        </Authorization>
      </div>
    </ContentLayout>
  );
});

Links.displayName = 'Links';
