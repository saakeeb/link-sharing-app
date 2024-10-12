import { FC } from 'react';

import facebook from '../../../assets/svg/facebook.svg';
import git from '../../../assets/svg/git.svg';
import link from '../../../assets/svg/link.svg';
import link_w from '../../../assets/svg/link_w.svg';
import mailbox from '../../../assets/svg/mailbox.svg';
import menu from '../../../assets/svg/menu.svg';
import right_arrow from '../../../assets/svg/right_arrow.svg';
import user from '../../../assets/svg/user.svg';
import view from '../../../assets/svg/view.svg';

export type IconProps = {
  name: string;
  className?: string;
  alt?: string;
};

const icons: Record<string, string> = {
  menu,
  user,
  mailbox,
  link,
  git,
  facebook,
  view,
  link_w,
  right_arrow,
};

export const ImageIcon: FC<IconProps> = ({ name, className, alt = '' }) => {
  const selectedIcon = icons[name];

  if (!selectedIcon) return null;

  return <img src={selectedIcon} className={className} alt={alt || name} />;
};
