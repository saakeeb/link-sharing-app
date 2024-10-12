import { useEffect, useState } from 'react';
import { NavLink, useNavigation } from 'react-router-dom';

import { ImageIcon } from '../ui/icon';
import { LinkIcon } from '../ui/icon/link-icon';
import { UserIcon } from '../ui/icon/user-icon';
import { useNotifications } from '../ui/notifications';

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
      aria-hidden="true"
    ></div>
  );
};

const navigation = [
  { name: 'Links', to: '.', icon: LinkIcon },
  { name: 'Profile Details', to: './profile', icon: UserIcon },
].filter(Boolean) as SideNavigationItem[];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const addNotification = useNotifications((state) => state.addNotification);
  const handleCopyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        addNotification({
          type: 'success',
          title: 'Copy',
          message: 'URL Link Copied',
        });
      })
      .catch((err) => {
        addNotification({
          type: 'error',
          title: 'Error',
          message: `${err}` || 'Failed to copy',
        });
      });
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div
        className={`relative ${location.pathname === '/preview' ? '' : 'flex w-full flex-col gap-4 p-4 sm:gap-6 sm:p-6'}`}
      >
        {location.pathname === '/preview' ? (
          <div className="flex w-full flex-col gap-4 p-4 sm:gap-6 sm:p-6">
            <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background  sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent">
              <Progress />
              <div className="mx-auto flex w-full max-w-[1440px] justify-between gap-4 rounded-md border bg-white px-6 py-4 shadow">
                <NavLink to="/" aria-label="Home">
                  <div className="rounded-md border border-[#633BFE] px-4 py-2 text-[#633BFE]">
                    <p className="text-xl">Back to Editor</p>
                  </div>
                </NavLink>
                <button
                  type="button"
                  className="rounded-md border border-[#633BFE] bg-[#633BFE] px-4 py-2 font-bold text-white"
                  onClick={handleCopyToClipboard}
                >
                  Share Link
                </button>
              </div>{' '}
            </header>
          </div>
        ) : (
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent">
            <Progress />
            <div className="mx-auto flex w-full max-w-[1440px] justify-between gap-4 rounded-md border bg-white px-6 py-4 shadow">
              <NavLink to="/" aria-label="home">
                <div className="flex items-center justify-start gap-2">
                  <div className="rounded-sm bg-[#633BFE]">
                    <ImageIcon
                      name="menu"
                      className="text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="hidden text-3xl font-bold text-slate-950 md:block">
                    devlinks
                  </p>
                </div>
              </NavLink>
              <nav
                className="flex items-center justify-between gap-2"
                aria-label="Main Navigation"
              >
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center justify-start gap-2 rounded-md px-4 py-2 hover:bg-violet-200 hover:text-[#633BFE] ${
                        isActive
                          ? 'bg-violet-200 text-[#633BFE]'
                          : 'bg-white text-black'
                      }`
                    }
                    aria-label={item.name}
                  >
                    <item.icon className="icon-hover" aria-hidden="true" />
                    <p className="hidden text-xl md:block">{item.name}</p>
                  </NavLink>
                ))}
              </nav>
              <NavLink to="preview" aria-label="Preview">
                <div className="rounded-md border border-[#633BFE] px-4 py-2 text-[#633BFE]">
                  <p className="hidden text-xl md:block">Preview</p>
                  <ImageIcon
                    name="view"
                    className="block md:hidden"
                    aria-hidden="true"
                  />
                </div>
              </NavLink>
            </div>
          </header>
        )}
        <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
