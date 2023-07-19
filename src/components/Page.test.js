import Page from './Page';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Page tests', () => {
  const { getAllByRole } = screen;

  test('should show pages properly with selected current page', () => {
    render(<Page results={50} type="search" input="cookies" currentPage="2" />, {
      wrapper: MemoryRouter
    });

    const lists = getAllByRole('listitem');
    const [, page1, page2, page3, page4] = lists;
    const numPages = lists.length - 2;
    const expectedPages = Math.ceil(50 / 15);

    expect(numPages).toEqual(expectedPages);

    expect(page1).not.toHaveClass('active');
    expect(page2).toHaveClass('active');
    expect(page3).not.toHaveClass('active');
    expect(page4).not.toHaveClass('active');
  });
});
