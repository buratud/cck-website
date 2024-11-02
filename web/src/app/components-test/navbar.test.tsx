import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/navbar';

// Mock next/link and next/image components to avoid Next.js specific errors
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => <>{children}</>;
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  test('renders logo, menu links, and hamburger menu', () => {
    // Check that the logo image is rendered
    expect(screen.getByAltText('Computer Club Logo')).toBeInTheDocument();

    // Check navigation links by their text content instead of href attribute
    expect(screen.getByText('หน้าแรก')).toBeInTheDocument();
    expect(screen.getByText('กิจกรรม')).toBeInTheDocument();
    expect(screen.getByText('เกี่ยวกับเรา')).toBeInTheDocument();

    // Check that the hamburger menu button exists
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  test('toggles menu when hamburger menu is clicked', () => {
    // Find the hamburger menu and simulate click
    const hamburgerMenu = screen.getByRole('button', { name: /menu/i });
    act(() => {
      fireEvent.click(hamburgerMenu);
    });

    // Query the navMenu directly and check for 'active' class
    const navMenu = screen.getByRole('list'); // Alternatively, use screen.getByClass('navMenu')
    expect(navMenu.className).toContain('active');

    // Click again to close menu
    act(() => {
      fireEvent.click(hamburgerMenu);
    });
    expect(navMenu.className).not.toContain('active');
  });

  test('menu closes on window resize if width is greater than 900px', () => {
    // Open the menu by clicking the hamburger icon
    const hamburgerMenu = screen.getByRole('button', { name: /menu/i });
    act(() => {
      fireEvent.click(hamburgerMenu);
    });

    // Ensure the menu is now open
    const navMenu = screen.getByRole('list');
    expect(navMenu.className).toContain('active');

    // Resize the window width to trigger the resize event
    act(() => {
      global.innerWidth = 1000;
      global.dispatchEvent(new Event('resize'));
    });

    // Check that the menu is closed (does not have `active` class)
    expect(navMenu.className).not.toContain('active');
  });
});
