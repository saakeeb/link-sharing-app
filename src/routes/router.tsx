import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/lib/auth';

import { AppRoot } from './routes/app/root';
// import { ProfileUpdate } from '@/features/profile-page';

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    // {
    //   path: '/',
    //   lazy: async () => {
    //     const { LandingRoute } = await import('./routes/landing');
    //     return { Component: LandingRoute };
    //   },
    // },
    {
      path: '/auth/register',
      lazy: async () => {
        const { RegisterRoute } = await import('./routes/auth/register');
        return { Component: RegisterRoute };
      },
    },
    {
      path: '/auth/login',
      lazy: async () => {
        const { LoginRoute } = await import('./routes/auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        // {
        //   path: 'discussions',
        //   lazy: async () => {
        //     const { DiscussionsRoute } = await import(
        //       './routes/app/discussions/discussions'
        //     );
        //     return { Component: DiscussionsRoute };
        //   },
        //   loader: async (args: LoaderFunctionArgs) => {
        //     const { discussionsLoader } = await import(
        //       './routes/app/discussions/discussions'
        //     );
        //     return discussionsLoader(queryClient)(args);
        //   },
        // },
        // {
        //   path: 'discussions/:discussionId',
        //   lazy: async () => {
        //     const { DiscussionRoute } = await import(
        //       './routes/app/discussions/discussion'
        //     );
        //     return { Component: DiscussionRoute };
        //   },

        //   loader: async (args: LoaderFunctionArgs) => {
        //     const { discussionLoader } = await import(
        //       './routes/app/discussions/discussion'
        //     );
        //     return discussionLoader(queryClient)(args);
        //   },
        // },
        {
          path: 'users',
          lazy: async () => {
            const { UsersRoute } = await import('./routes/app/users');
            return { Component: UsersRoute };
          },

          loader: async () => {
            const { usersLoader } = await import('./routes/app/users');
            return usersLoader(queryClient)();
          },
        },
        // {
        //   path: 'profile',
        //   lazy: async () => {
        //     const { ProfileRoute } = await import('./routes/app/profile');
        //     return { Component: ProfileRoute };
        //   },
        // },
        {
          path: '',
          lazy: async () => {
            const { Links } = await import(
              '../features/links-page/routes/links'
            );
            return { Component: Links };
          },
        },
        {
          path: 'profile',
          lazy: async () => {
            const { ProfileUpdate } = await import(
              '../features/profile-page/routes/profile-update'
            );
            return { Component: ProfileUpdate };
          },
        },
        {
          path: 'preview',
          lazy: async () => {
            const { PreviewLinks } = await import(
              '../features/preview-page/routes/preview-links'
            );
            return { Component: PreviewLinks };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./routes/not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
