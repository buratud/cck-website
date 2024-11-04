/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/footer';

// Mock next/link and next/image components to avoid Next.js specific errors
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode, href: string }) => <a href={href}>{children}</a>;
});

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

describe('Footer Component', () => {
    beforeEach(() => {
        render(<Footer />);
    });

    test('renders logo and club text', () => {
        const logoImage = screen.getByAltText('Computer Club Logo');
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', '/CCK_normal_circle.png');
        expect(screen.getByText('Computer Club')).toBeInTheDocument();
        expect(screen.getByText('KMUTNB')).toBeInTheDocument();
    });

    test('renders copyright text', () => {
        expect(screen.getByText('© 2024-2025 Computer Club KMUTNB, All rights reserved.')).toBeInTheDocument();
    });

    test('renders social media links with correct URLs and icons', () => {
        const facebookLink = screen.getByRole('link', { name: 'Facebook' });
        expect(facebookLink).toBeInTheDocument();
        expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/ComClubKMUTNB');
        expect(screen.getByAltText('Facebook')).toHaveAttribute('src', '/fb.png');

        const instagramLink = screen.getByRole('link', { name: 'Instagram' });
        expect(instagramLink).toBeInTheDocument();
        expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/comclub_kmutnb/');
        expect(screen.getByAltText('Instagram')).toHaveAttribute('src', '/ig.png');
    });
});
