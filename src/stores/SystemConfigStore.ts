import create from 'zustand';

import { Settings } from '@/features/settings/settings';

type SystemConfigState = {
  settingsConfig: Settings | null;
  setSystemConfig: (settingsConfig: Settings) => void;
};

export const useSystemConfigStore = create<SystemConfigState>((set) => ({
  settingsConfig: null,
  setSystemConfig: (settingsConfig) => set(() => ({ settingsConfig })),
}));
