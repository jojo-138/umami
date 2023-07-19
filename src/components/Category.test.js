import Category from './Category';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Cuisine category tests', () => {
  const { getAllByRole } = screen;

  beforeEach(() => render(<Category />, { wrapper: MemoryRouter }));

  test('there should be only 4 cuisines', () => {
    const links = getAllByRole('link');

    expect(links.length).toEqual(4);
  });

  test('no active cuisine initially', () => {
    const links = getAllByRole('link');

    for (const link of links) {
      expect(link).not.toHaveClass('active');
    }
  });

  test('selected cuisine is active with red color and the rest is not, with gray color', () => {
    const links = getAllByRole('link');
    const [red, gray] = ['#b21024', '#1f1f1f'];

    fireEvent.click(links[1]);

    expect(links[1]).toHaveClass('active');
    expect(links[1]).toHaveStyle(`background: ${red}`);

    for (let i = 0; i < 4; i++) {
      if (i === 1) continue;
      expect(links[i]).not.toHaveClass('active');
      expect(links[i]).toHaveStyle(`background: ${gray}`);
    }
  });
});
