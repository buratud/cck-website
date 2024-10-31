import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extra matchers like toBeInTheDocument
import Placeholder from '../components/placeholder';

describe('Placeholder Component', () => {
  const title = 'Sample Title';
  const description = 'Sample description text for the placeholder component.';
  const imgsrc = '/path/to/image.jpg';
  const buttonLink = '/some-link';
  const buttonText = 'Click Me';

  test('renders correctly with title, description, and image', () => {
    render(<Placeholder title={title} description={description} imgsrc={imgsrc} />);

    // Check if the title, description, and image are displayed
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Placeholder/i })).toHaveAttribute('src', imgsrc);
  });

  test('renders button with default text if showButton is true and buttonLink is provided', () => {
    render(<Placeholder title={title} description={description} imgsrc={imgsrc} buttonLink={buttonLink} showButton={true} />);

    const button = screen.getByRole('link', { name: 'Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', buttonLink);
  });

  test('renders button with custom text when buttonText is provided', () => {
    render(<Placeholder title={title} description={description} imgsrc={imgsrc} buttonLink={buttonLink} showButton={true} buttonText={buttonText} />);

    const button = screen.getByRole('link', { name: buttonText });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', buttonLink);
  });

  test('does not render button if showButton is false', () => {
    render(<Placeholder title={title} description={description} imgsrc={imgsrc} showButton={false} />);

    expect(screen.queryByRole('link')).toBeNull();
  });

  test('does not render button if buttonLink is not provided', () => {
    render(<Placeholder title={title} description={description} imgsrc={imgsrc} showButton={true} />);

    expect(screen.queryByRole('link')).toBeNull();
  });
});
