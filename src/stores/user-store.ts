import { SetState, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type UserInfoProps = {
  profile?: string | null;
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type UserInfoData = {
  userInfo: UserInfoProps;
  updateUserInfo: (data: UserInfoProps) => void;
};

export const useUserInfo = create<UserInfoData>()(
  devtools(
    persist(
      (set: SetState<UserInfoData>) => ({
        userInfo: {},
        updateUserInfo: (data) => set({ userInfo: data }),
      }),
      { name: 'UserInfo' },
    ),
  ),
);
