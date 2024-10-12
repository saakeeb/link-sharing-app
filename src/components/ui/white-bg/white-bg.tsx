import React, { ReactNode } from 'react';

export interface WhiteBGProps {
  children: ReactNode;
}

export const WhiteBG: React.FC<WhiteBGProps> = ({ children }) => {
  return (
    <div className="size-full rounded-md border bg-white px-6 py-4 shadow">
      {children}
    </div>
  );
};
