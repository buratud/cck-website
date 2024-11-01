import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPlaceholder from '../components/about_placeholder';

describe('AboutPlaceholder Component', () => {
    const mockData = {
        title: 'About Us',
        description: 'We are a dedicated team focused on providing the best solutions.',
        imgsrc: '/path/to/image.jpg',
        email: 'info@example.com',
    };

    beforeEach(() => {
        jest.useFakeTimers();
        render(
            <AboutPlaceholder
                title={mockData.title}
                description={mockData.description}
                imgsrc={mockData.imgsrc}
                email={mockData.email}
            />
        );
    });

    test('renders title, description, image, and email', () => {
        expect(screen.getByText(mockData.title)).toBeInTheDocument();
        expect(screen.getByText(mockData.description)).toBeInTheDocument();

        const image = screen.getByAltText('Placeholder');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockData.imgsrc);

        expect(screen.getByText(mockData.email)).toBeInTheDocument();
    });

    test('copies email to clipboard and shows "Copied!" message', async () => {
        const emailText = screen.getByText(mockData.email);

        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn(),
            },
        });
        fireEvent.click(emailText);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData.email);

        expect(screen.getByText('Copied!')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(screen.getByText(mockData.email)).toBeInTheDocument();
    });

    test('applies responsive classes when window width is below 700px', () => {
        act(() => {
            global.innerWidth = 600;
            global.dispatchEvent(new Event('resize'));
        });

        // Select the correct container element explicitly
        const container = screen.getByRole('img', { name: 'Placeholder' }).closest('div');

        const title = screen.getByText(mockData.title);
        const description = screen.getByText(mockData.description);

        // Check for responsive classes
        expect(container).toHaveClass('responsive-container');
        expect(title).toHaveClass('responsive-title');
        expect(description).toHaveClass('responsive-description');
    });
});
