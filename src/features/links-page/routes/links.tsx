import React, { memo } from 'react';

import { ContentLayout } from '@/components/layouts';
import { Authorization, ROLES } from '@/lib/authorization';
import { LinkView } from '../components/leftside';

export const Links = memo(() => {
  return (
    <ContentLayout title="Customize Your Links" showTitle>
      <div className="flex flex-col">
        <Authorization
          forbiddenFallback={<div>Only Admin Can View This</div>}
          allowedRoles={[ROLES.ADMIN]}
        >
          <div className='flex justify-between items-center gap-6'>
            <LinkView />
            <div></div>
          </div>
        </Authorization>
      </div>
    </ContentLayout>
  );
});
Links.displayName = 'Links';
