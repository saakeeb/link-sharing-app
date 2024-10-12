import React, { memo, Suspense } from 'react';

import { LinkView } from '@/features/links-page/components/leftside';

export const PreviewLinks = memo(() => {
  return (
    <section
      className="relative -mt-[128px] h-4/6 w-full rounded-b-xl bg-[#633BFE]"
      aria-labelledby="preview-links-title"
    >
      <h2 id="preview-links-title" className="sr-only">
        Preview Links
      </h2>
      <div className="mt-40">
        <Suspense fallback={<div>Loading links...</div>}>
          <LinkView />
        </Suspense>
      </div>
    </section>
  );
});
PreviewLinks.displayName = 'PreviewLinks';
