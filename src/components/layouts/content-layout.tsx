import * as React from 'react';

import { Head } from '../seo';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  showTitle?: boolean;
};

export const ContentLayout = ({
  children,
  title,
  showTitle = false,
}: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="">
        {showTitle && (
          <div className="mx-auto max-w-[1440px]  px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
        )}
        <div className="mx-auto max-w-[1440px] ">{children}</div>
      </div>
    </>
  );
};
