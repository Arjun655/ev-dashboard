import { render, screen } from '@testing-library/react';
import App from 'D:\\File\\Programming\\Web development\\electrifyit-reports-dashboard\\src\\App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
