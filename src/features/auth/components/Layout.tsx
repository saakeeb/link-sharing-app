import * as React from 'react';
import login_bg from '@/assets/svgs/login_bg.svg';
import login_logo from '@/assets/svgs/login_logo.svg';
import devlinks from '@/assets/png/devlinks.png';
import { Head } from '@/components/Head';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="h-screen flex flex-col justify-between">
        <div className="lg:mt-[90px] p-10 lg:p-0 lg:ml-[120px] bg-white flex items-center jusify-center lg:justify-between">
          <div className="w-full lg:pr-[10%]">
            <img src={devlinks} alt="Dev links" className="mb-8" />
            <div>{children}</div>
          </div>
        </div>
        <p className="mb-[5px] w-full text-center text-primary-dark-gray text-[14px] italic">
          Copyright © 2024 Nazmus Sakib - All rights reseverd.{' '}
          <span>
            <a href="#" className="underline underline-offset-2">
              Terms and Conditions
            </a>
          </span>
        </p>
      </div>
    </>
  );
};
