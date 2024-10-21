import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../src/common/Navbar';
import '@testing-library/jest-dom';

describe('Navbar Component', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it('renders the navbar with logo and title', () => {
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    const title = screen.getByText('Financial Dashboard');
    expect(title).toBeInTheDocument();
  });

  it('toggles the menu on button click', () => {
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    expect(screen.queryByText('Menu Item')).not.toBeInTheDocument();
  });
});
