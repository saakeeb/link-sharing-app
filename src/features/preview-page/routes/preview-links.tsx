import React, { memo } from 'react';

import { LinkView } from '@/features/links-page/components/leftside';

export const PreviewLinks = memo(() => {
  return (
    <div className="relative -mt-[128px] h-4/6 w-full rounded-b-xl bg-[#633BFE]">
      <div className="mt-40">
        <LinkView />
      </div>
    </div>
  );
});
PreviewLinks.displayName = 'PreviewLinks';
