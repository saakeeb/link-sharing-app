// src/features/preview-page/__tests__/preview-links.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { PreviewLinks } from '../routes/preview-links';

// Mock the LinkView component to simulate lazy loading
vi.mock('@/features/links-page/components/leftside', () => ({
  LinkView: vi.fn(() => {
    // Simulate some delay in rendering
    return <div data-testid="link-view">Mocked LinkView Component</div>;
  }),
}));

describe('PreviewLinks Component', () => {
  it('renders without crashing', () => {
    render(<PreviewLinks />);
    const section = screen.getByRole('region', { name: /preview links/i });
    expect(section).toBeInTheDocument();
  });

  it('renders the LinkView component after loading', async () => {
    render(<PreviewLinks />);

    // Wait for the mocked LinkView component to appear
    await waitFor(() => {
      const linkView = screen.getByTestId('link-view');
      expect(linkView).toBeInTheDocument();
    });
  });
});
