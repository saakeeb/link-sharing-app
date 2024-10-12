import React, { memo } from 'react';

import { ContentLayout } from '@/components/layouts';
import { WhiteBG } from '@/components/ui/white-bg/white-bg';
import { Authorization, ROLES } from '@/lib/authorization';

import { LinkView } from '../components/leftside';
import { LinkCreate } from '../components/link-create';

export const Links = memo(() => {
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
