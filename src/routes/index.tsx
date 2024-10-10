import { useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import i18next from 'i18next';
import { Login } from '@/features/auth/routes/Login';
import { useUser } from '@/lib/auth';
import { useUserStore } from '@/stores/userStore';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { NotFound } from '@/features/misc';

export const AppRoutes = () => {
  const user = useUser();
  const setUser: any = useUserStore((state) => state.setUser);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    const lang = user.data?.language || 'EN';

    if (storedLanguage !== lang) {
      i18next.changeLanguage(lang);
    }

    setUser(user.data);
  }, [user.data]);

  const commonRoutes = [{ path: '/', element: <Login /> }];
  const routes = user.data ? protectedRoutes : publicRoutes;

  const element = useRoutes([
    ...routes,
    ...commonRoutes,
    user.data ? { path: '/*', element: <NotFound /> } : { path: '/', element: <Login /> },
  ]);

  return <>{element}</>;
};
