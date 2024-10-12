import React, { memo } from 'react';

import { ContentLayout } from '@/components/layouts';
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
            <div className="hidden size-full lg:block">
              <LinkView />
            </div>
            <div className="size-full">
              <LinkCreate />
            </div>
          </div>
        </Authorization>
      </div>
    </ContentLayout>
  );
});
Links.displayName = 'Links';
