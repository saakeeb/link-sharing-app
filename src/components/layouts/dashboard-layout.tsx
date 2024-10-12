import { useEffect, useState } from 'react';
import { NavLink, useNavigation } from 'react-router-dom';

import { ImageIcon } from '../ui/icon';
import { LinkIcon } from '../ui/icon/link-icon';
import { UserIcon } from '../ui/icon/user-icon';

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const Progress = () => {
  const { state, location } = useNavigation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [location?.pathname]);

  useEffect(() => {
    if (state === 'loading') {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const newProgress = oldProgress + 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 300);

      return () => {
        clearInterval(timer);
      };
    }
  }, [state]);

  if (state !== 'loading') {
    return null;
  }

  return (
    <div
      className="fixed left-0 top-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigation = [
    { name: 'Links', to: '.', icon: LinkIcon },
    { name: 'Profile Details', to: './profile', icon: UserIcon },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex w-full flex-col gap-4 p-4 sm:gap-6 sm:p-6">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent">
          <Progress />
          <div className="mx-auto flex w-full max-w-[1440px]  justify-between gap-4 rounded-md border bg-white px-6 py-4 shadow">
            <div className="flex items-center justify-start gap-2">
              <div className="rounded-sm bg-violet-700">
                <ImageIcon name="menu" className="text-white" />
              </div>
              <p className="hidden text-3xl font-bold text-slate-950 md:block">
                devlinks
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `flex items-center justify-start gap-2 rounded-md px-4 py-2  hover:bg-violet-200 hover:text-violet-700 ${
                      isActive
                        ? 'bg-violet-200 text-violet-700'
                        : 'bg-white text-black'
                    }`
                  }
                >
                  <item.icon className="icon-hover" />
                  <p className="hidden text-xl md:block">{item.name}</p>
                </NavLink>
              ))}
            </div>
            <div className="rounded-md  border border-violet-700 px-4 py-2 text-violet-700">
              <p className="hidden text-xl  md:block">Preview</p>
              <ImageIcon name="view" className="block md:hidden" />
            </div>
          </div>
        </header>
        {/* <DropdownMenuItem
                className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
                onClick={() => logout.mutate({})}
              >
                Sign Out
              </DropdownMenuItem> */}
        <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
