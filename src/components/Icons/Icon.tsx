import { FC } from 'react';

import dashboard_icon from '@/assets/svgs/dashboard_icon.svg';

type IconProps = {
  name: string;
  className?: string;
};
export const HeroIcon: FC<IconProps> = ({ name, className }: IconProps) => {
  const getIcon = () => {
    switch (name) {
      case 'dashboard':
        return <img src={dashboard_icon} className={className} alt="" />;

      default:
        return null;
    }
  };
  return <div>{getIcon()}</div>;
};
