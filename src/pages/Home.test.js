import Home from './Home';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { server } from '../../mocks/mockServer';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

describe('Home component', () => {
  const { getAllByRole } = screen;

  beforeAll(() => server.listen());
  beforeEach(() => render(<Home />, { wrapper: MemoryRouter }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('should initially render 2 empty carousel', () => {
    const carousels = getAllByRole('presentation');

    expect(carousels.length).toEqual(2);
    expect(carousels[0]).toBeEmptyDOMElement();
    expect(carousels[1]).toBeEmptyDOMElement();
  });

  test('should load 9 recipes each per carousel after fetch', async () => {
    const carousels = getAllByRole('presentation');

    await waitFor(() => {
      expect(carousels[0].querySelectorAll('[role="tabpanel"]').length).toEqual(9);
      expect(carousels[1].querySelectorAll('[role="tabpanel"]').length).toEqual(9);
    });
  });
});
