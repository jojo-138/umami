import Cuisine from './Cuisine';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import * as useFetch from '../hooks/useFetch';
import { mockedResponse } from '../../mocks/mockResponses';
import { server } from '../../mocks/mockServer';
import { rest } from 'msw';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}));

server.use(
  rest.get('https://api.spoonacular.com/recipes/complexSearch', (req, res, ctx) => {
    return res(ctx.json(mockedResponse));
  })
);

describe('Cuisine component', () => {
  const { getAllByRole, queryAllByRole, findAllByRole } = screen;
  const useFetchSpy = jest.spyOn(useFetch, 'default');

  beforeAll(() => server.listen());
  beforeEach(() =>
    render(
      <MemoryRouter initialEntries={['/cuisine/american/1']}>
        <Routes>
          <Route path="/cuisine/:cuisine/:page" element={<Cuisine />} />
        </Routes>
      </MemoryRouter>
    )
  );
  afterEach(() => {
    server.resetHandlers();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  afterAll(() => {
    server.close();
    jest.resetAllMocks();
  });

  test('should show recipes and pages correctly and able to go to next page', async () => {
    const initialCards = queryAllByRole('link');

    expect(initialCards.length).toEqual(0);
    expect(useFetchSpy).toHaveBeenCalledWith('complexSearch', 15, 'cuisine', 'american', '1');
    expect(useFetchSpy).toHaveBeenCalledTimes(1);

    const pageListItems = await findAllByRole('listitem');
    const allLinks = getAllByRole('link');
    const cards = allLinks.slice(0, mockedResponse.results.length);
    const expectedNumOfPageListItems = Math.ceil(mockedResponse.totalResults / 15) + 2;
    const recipeIds = mockedResponse.results.map((recipe) => recipe.id);

    for (let i = 0; i < cards.length; i++) {
      expect(cards[i]).toHaveAttribute('href', `/recipe/${recipeIds[i]}`);
    }

    expect(cards.length).toEqual(mockedResponse.results.length);
    expect(pageListItems.length).toEqual(expectedNumOfPageListItems);
    expect(pageListItems[1]).toHaveClass('active');

    for (let i = 2; i < pageListItems.length - 1; i++) {
      expect(pageListItems[i]).not.toHaveClass('active');
    }

    fireEvent.click(pageListItems[pageListItems.length - 1].querySelector('a'));

    expect(mockUseNavigate).toHaveBeenCalledWith('/cuisine/american/2');
  });
});
