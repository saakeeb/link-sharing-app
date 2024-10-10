/* eslint-disable no-restricted-imports */
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Profile } = lazyImport(() => import('@/features/users/users'), 'Profile');

const { MaintenanceReport } = lazyImport(
  () => import('@/features/maintenance-report'),
  'MaintenanceReport'
);
const { Customers } = lazyImport(() => import('@/features/customers'), 'Customers');
const { ServiceCalls } = lazyImport(() => import('@/features/service-calls'), 'ServiceCalls');
const { Products } = lazyImport(() => import('@/features/products'), 'Products');
const { ContactSystems } = lazyImport(() => import('@/features/contact-system'), 'ContactSystems');
const { ManageUsers } = lazyImport(() => import('@/features/users/users'), 'ManageUsers');

const { ParkingSlot } = lazyImport(
  () => import('@/features/company/parking-slot/routes/ParkingSlot'),
  'ParkingSlot'
);
const { ManageCompany } = lazyImport(() => import('@/features/company/company'), 'ManageCompany');

const { ManageCalendar } = lazyImport(
  () => import('@/features/company/calendar'),
  'ManageCalendar'
);
const { SystemSettings } = lazyImport(
  () => import('@/features/settings/settings'),
  'SystemSettings'
);
const { ManageMenus } = lazyImport(() => import('@/features/settings/menus'), 'ManageMenus');
const { MyApiKeys } = lazyImport(() => import('@/features/settings/my-api-keys'), 'MyApiKeys');

export const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/app',
    element: <App />,
    children: [{ path: 'manage-users', element: <ManageUsers /> }],
  },
  {
    path: '/app',
    element: <App />,
    children: [{ path: 'customers', element: <Customers /> }],
  },
  {
    path: '/app',
    element: <App />,
    children: [{ path: 'service-calls', element: <ServiceCalls /> }],
  },
  {
    path: '/app',
    element: <App />,
    children: [{ path: 'products', element: <Products /> }],
  },
  {
    path: '/app',
    element: <App />,
    children: [{ path: 'contact-systems', element: <ContactSystems /> }],
  },
  {
    path: '/app',
    element: <App />,
    children: [{ path: 'parking-slot', element: <ParkingSlot /> }],
  },
  {
    path: '/app',
    element: <App />,
    children: [
      { path: 'manage-company', element: <ManageCompany /> },
      { path: 'manage-calendar', element: <ManageCalendar /> },
    ],
  },
  {
    path: '/app',
    element: <App />,
    children: [
      { path: 'system-configurations', element: <SystemSettings /> },
      { path: 'manage-sidebar', element: <ManageMenus /> },
      { path: 'my-api-keys', element: <MyApiKeys /> },
    ],
  },
];
