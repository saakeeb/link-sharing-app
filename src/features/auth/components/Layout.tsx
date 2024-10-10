import * as React from 'react';
import login_bg from '@/assets/svgs/login_bg.svg';
import login_logo from '@/assets/svgs/login_logo.svg';
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
          <div className="w-full lg:max-w-[50%] lg:pr-[10%]">
            <img src={login_logo} alt="" />
            <h2 className="mt-8 mb-5 text-[32px] text-primary-dark-gray font-semibold">{title}</h2>
            <div>{children}</div>
          </div>
          <img src={login_bg} alt="" className="w-1/2 hidden lg:block" />
        </div>
        <p className="mb-[5px] w-full text-center text-primary-dark-gray text-[14px] italic">
          Copyright © 2024 Mustak Agrikli - All rights reseverd.{' '}
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
