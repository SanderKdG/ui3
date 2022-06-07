import { render, screen } from '@testing-library/react';
import MyTheme from './App';

test('renders learn react link', () => {
  render(<MyTheme />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
