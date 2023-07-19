import Input from './Input';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}));

describe('Input tests', () => {
  const { getByRole } = screen;

  beforeEach(() => render(<Input />, { wrapper: MemoryRouter }));
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  test('should initially be empty', () => {
    expect(getByRole('textbox')).toHaveValue('');
  });

  test('should have input value when user types and useNavigate should be called after submit', () => {
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'cookies' } });
    fireEvent.submit(input);

    expect(input).toHaveValue('cookies');
    expect(mockUseNavigate).toHaveBeenCalledWith('/search/cookies/1');
  });
});
