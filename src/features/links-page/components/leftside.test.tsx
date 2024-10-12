import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { useLinksShare } from '@/stores/links-store';
import { useUserInfo } from '@/stores/user-store';

import { LinkView } from './leftside';

// Mock the hooks
vi.mock('@/stores/links-store', () => ({
  useLinksShare: vi.fn(),
}));

vi.mock('@/stores/user-store', () => ({
  useUserInfo: vi.fn(),
}));

describe('LinkView Component', () => {
  const mockSocialLinks = [
    { id: '1', platform: 'Twitter', color: 'bg-blue-500' },
    { id: '2', platform: 'Facebook', color: 'bg-blue-700' },
  ];

  const mockUserInfo = {
    profile: 'profile.jpg',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  beforeEach(() => {
    (useLinksShare as any).mockReturnValue({
      socialLinks: mockSocialLinks,
      updateSocialLinksOrder: vi.fn(),
      setSelectedSocialLink: vi.fn(),
    });

    (useUserInfo as any).mockReturnValue({
      userInfo: mockUserInfo,
    });
  });

  it('renders user information correctly', () => {
    render(<LinkView />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('renders social links correctly', () => {
    render(<LinkView />);
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });

  it('calls setSelectedSocialLink when edit button is clicked', () => {
    const { setSelectedSocialLink } = useLinksShare();
    render(<LinkView />);
    const editButton = screen.getAllByTitle('Edit Link')[0];
    fireEvent.click(editButton);
    expect(setSelectedSocialLink).toHaveBeenCalledWith(mockSocialLinks[0]);
  });
});
