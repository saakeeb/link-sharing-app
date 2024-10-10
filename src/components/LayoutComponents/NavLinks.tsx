import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillAppstore } from 'react-icons/ai';
import { BiSolidCarGarage } from 'react-icons/bi';
import { BiSolidUserBadge } from 'react-icons/bi';
import { BiSolidCar } from 'react-icons/bi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa';
import { FaUserLock } from 'react-icons/fa6';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { HiUserGroup } from 'react-icons/hi2';
import { MdHomeRepairService } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';
import { TbReportMoney } from 'react-icons/tb';
import { useNavigate, NavLink } from 'react-router-dom';

import { useLogout } from '@/lib/auth';
import { useThemeStore } from '@/stores/themeStore';

type NavLinkItem = {
  name: string;
  to: string;
  subMenu?: NavLinkItem[];
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const NavLinks = ({ isSidebarOpen }: { isSidebarOpen?: boolean }) => {
  const logout = useLogout();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useThemeStore((state: any) => state.theme);

  const navigation = [
    { name: t('navigation.sidebar.dashboard'), to: '.', icon: AiFillAppstore },
    {
      name: t('navigation.sidebar.maintenance_report'),
      to: '/app/maintenance-report',
      icon: FaTools,
    },
    {
      name: t('navigation.sidebar.customers'),
      to: '/app/customers',
      icon: HiUserGroup,
    },
    {
      name: t('navigation.sidebar.service_calls'),
      to: '/app/service-calls',
      icon: HiUserGroup,
    },
    {
      name: t('navigation.sidebar.products'),
      to: '/app/products',
      icon: HiUserGroup,
    },
    {
      name: t('navigation.sidebar.contact_systems'),
      to: '/app/contact-systems',
      icon: HiUserGroup,
    },
    {
      name: t('navigation.sidebar.system_users'),
      to: '',
      icon: BiSolidUserBadge,
      subMenu: [
        { name: t('pages.add_user'), to: `/app/manage-users?add-user=1` },
        { name: t('pages.manage_users'), to: '/app/manage-users' },
      ],
    },
    {
      name: t('navigation.sidebar.company_info'),
      to: '',
      icon: HiOutlineInformationCircle,
      subMenu: [
        { name: t('pages.manage_company'), to: '/app/manage-company' },
        { name: t('pages.manage_calendar'), to: '/app/manage-calendar' },
      ],
    },
    {
      name: t('navigation.sidebar.system_settings'),
      to: '',
      icon: FaTools,
      subMenu: [
        { name: t('pages.system_configuration'), to: '/app/system-configurations' },
        { name: t('pages.manage_sidebar'), to: '/app/manage-sidebar' },
        { name: t('pages.manage_api_keys'), to: '/app/my-api-keys' },
      ],
    },
  ].filter(Boolean) as NavLinkItem[];

  const handleRoute = (menuItem: string) => {
    if (menuItem) {
      navigate(menuItem);
    }
  };

  return (
    <>
      {navigation.map((item, navIndex) => (
        <div key={navIndex} className="relative z-50">
          <NavLink
            end={navIndex === 0}
            key={item.name}
            to={item.to}
            onClick={(e) => !item.to && e.preventDefault()}
            className={({ isActive }) =>
              clsx(
                `relative group ${
                  theme === 'dark' ? 'text-white' : 'text-primary-dark-gray'
                } hover:text-primary-turquoise`,
                'group flex items-center py-2 pl-4 text-base font-medium rounded-r-md',
                isActive &&
                  item.to &&
                  'bg-gradient-to-r from-primary-turquoise/30 from-10% via-transparent via-80% to-transparent to-10% !text-primary-turquoise'
              )
            }
          >
            <item.icon className={clsx('mr-4 flex-shrink-0 h-6 w-6')} aria-hidden="true" />
            <div className={`w-full flex items-center justify-between whitespace-nowrap group`}>
              <p className="md:hidden">{item.name}</p>
              {isSidebarOpen && (
                <>
                  <p>{item.name}</p>
                  {item?.subMenu?.length && item?.subMenu?.length > 0 && (
                    <div className="pr-4">
                      <FaChevronDown size={10} className="group-hover:hidden" />
                      <FaChevronRight size={10} className="hidden group-hover:block" />
                    </div>
                  )}
                </>
              )}
            </div>

            {item?.subMenu?.length && item?.subMenu?.length > 0 && (
              <div
                className={`${
                  theme === 'dark'
                    ? '!text-white bg-dark'
                    : 'text-black bg-white border-1 border-opacity-90 border-gray-400 shadow-lg'
                } transition-colors duration-300 cursor-default absolute ${
                  navIndex < navigation.length - 2 ? 'top-0' : 'bottom-0'
                } -right-[270px] hidden hover:block group-hover:block rounded-xl gap-y-5 w-[250px]`}
              >
                {item?.subMenu?.map((menuItem, index) => (
                  <div key={index}>
                    <div onClick={() => handleRoute(menuItem.to)} key={index}>
                      <div className="relative z-[500] group">
                        {index ===
                          (navIndex < navigation.length - 2
                            ? 0
                            : item.subMenu
                            ? item.subMenu.length - 1
                            : 0) && (
                          <div
                            className={`${
                              theme === 'dark' ? 'bg-dark' : 'bg-white'
                            } absolute top-4 -left-[6px] w-3 h-3 rotate-45`}
                          ></div>
                        )}
                        <div
                          className={`absolute z-10 top-0 -left-7 w-7 h-full bg-transparent`}
                        ></div>
                        <p
                          className={`${
                            theme === 'dark'
                              ? 'hover:bg-white/20 text-white'
                              : 'hover:bg-gray-200 text-gray-600'
                          } relative z-20 py-2 px-5 cursor-pointer font-normal border-transparent  ${
                            index === 0
                              ? 'rounded-t-xl'
                              : index === (item?.subMenu?.length as number) - 1
                              ? 'rounded-b-xl'
                              : ''
                          }`}
                        >
                          {menuItem.name}
                        </p>
                      </div>
                    </div>
                    {item && item.subMenu && index !== item?.subMenu?.length - 1 && (
                      <hr className={`${theme === 'dark' ? "'bg-white" : 'bg-gray-100'} h-[1px]`} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </NavLink>
        </div>
      ))}
      <button
        className={` ${
          theme === 'dark' ? 'text-red-500' : 'text-primary-dark-gray'
        }  hover:text-primary-turquoise flex items-center py-2 pl-4 flex-nowrap text-base font-medium`}
        onClick={() => logout.mutate({})}
      >
        <FiLogOut className="mr-4 flex-shrink-0 h-6 w-6" />
        {isSidebarOpen && <span className="whitespace-nowrap">{t('common.actions.sign_out')}</span>}
      </button>
    </>
  );
};
