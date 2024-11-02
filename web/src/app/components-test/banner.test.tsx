import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner from '../components/banner';

describe('Banner Component', () => {
  test('renders title, subtitle, and button when showButton is true', () => {
    render(<Banner title="Welcome to the Club" subtitle="Join us in our journey!" showButton={true} />);

    expect(screen.getByText('Welcome to the Club')).toBeInTheDocument();
    expect(screen.getByText('Join us in our journey!')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'เกี่ยวกับเรา' });
    expect(button).toBeInTheDocument();
  });

  test('does not render button when showButton is false', () => {
    render(<Banner title="Welcome to the Club" subtitle="Join us in our journey!" showButton={false} />);

    expect(screen.getByText('Welcome to the Club')).toBeInTheDocument();
    expect(screen.getByText('Join us in our journey!')).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: 'เกี่ยวกับเรา' })).not.toBeInTheDocument();
  });

  test('applies responsive classes when window width is below 900px', () => {
    render(<Banner title="Welcome to the Club" subtitle="Join us in our journey!" showButton={true} />);

    // Simulate a smaller screen size
    act(() => {
      global.innerWidth = 800;
      global.dispatchEvent(new Event('resize'));
    });

    // Check for responsive classes
    const title = screen.getByText('Welcome to the Club');
    const subtitle = screen.getByText('Join us in our journey!');
    expect(title).toHaveClass('responsive-title');
    expect(subtitle).toHaveClass('responsive-subtitle');
  });
});
