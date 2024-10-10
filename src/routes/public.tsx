
import { MaintenanceReport } from '@/features/maintenance-report';
import { lazyImport } from '@/utils/lazyImport';
import { App } from './protected';

const { Login } = lazyImport(() => import('@/features/auth/routes/Login'), 'Login');

export const publicRoutes = [
  {
    path: 'auth/*',
    element: <Login />,
  },
  {
    path: '/main',
    element: <App />,
    children: [{ path: 'maintenance-report', element: <MaintenanceReport /> }],
  },
];
