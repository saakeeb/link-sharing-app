import { SetState, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type SocialLinksProps = {
  platform?: string;
  url?: string;
  id?: string;
  color?: string;
};

export type LinksShareProps = {
  socialLinks: SocialLinksProps[];
  updateSocialLinks: (newData: SocialLinksProps[]) => void;
  updateSocialLinksOrder: (newOrder: SocialLinksProps[]) => void;
  selectedSocialLink: SocialLinksProps | null;
  setSelectedSocialLink: (link: SocialLinksProps) => void;
  removeSocialLink: (link: SocialLinksProps) => void;
};

export const useLinksShare = create<LinksShareProps>()(
  devtools(
    persist(
      (set: SetState<LinksShareProps>) => ({
        socialLinks: [],
        updateSocialLinks: (newData) =>
          set((state) => {
            console.log('newData: ', newData);
            const updatedLinks = state.socialLinks.map((link) => {
              const newLink = newData.find((newLink) => newLink.id === link.id);
              return newLink ? { ...link, ...newLink } : link;
            });

            const newLinksToAdd = newData.filter(
              (newLink) =>
                !state.socialLinks.some((link) => link.id === newLink.id),
            );

            return {
              socialLinks: [...updatedLinks, ...newLinksToAdd],
            };
          }),
        updateSocialLinksOrder: (newData) => set({ socialLinks: newData }),
        selectedSocialLink: {},
        setSelectedSocialLink: (link) => set({ selectedSocialLink: link }),
        removeSocialLink: (newData) =>
          set((state) => ({
            socialLinks: state.socialLinks.filter(
              (link) => link.id !== newData.id,
            ),
          })),
      }),
      { name: 'SocialLinks' },
    ),
  ),
);
