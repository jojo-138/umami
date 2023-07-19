import App from './App';
import { rest } from 'msw';
import { server } from '../mocks/mockServer';
import {
  glutenFreeMockedResponse,
  randomMockedResponse,
  recipeMockedResponse,
  mockedResponse,
  mockedResponsePage3
} from '../mocks/mockResponses';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

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

describe('App component', () => {
  const { getByRole, getByText, queryByText, getAllByRole } = screen;
  const randomRecipeTitles = randomMockedResponse.recipes.map((recipe) => recipe.title);
  const glutenFreeRecipeTitles = glutenFreeMockedResponse.results.map((recipe) => recipe.title);
  const searchRecipeTitles = mockedResponse.results.map((recipe) => recipe.title);
  const searchRecipeTitlesPage3 = mockedResponsePage3.results.map((recipe) => recipe.title);

  beforeAll(() => server.listen());
  beforeEach(() =>
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('should show random and gluten free recipes in home', async () => {
    await waitFor(() => {
      for (let i = 0; i < randomRecipeTitles.length; i++) {
        expect(getByText(randomRecipeTitles[i])).toBeInTheDocument();
        expect(getByText(glutenFreeRecipeTitles[i])).toBeInTheDocument();
      }
    });
  });

  test('should load search page with user input, able to navigate to other pages, and view a recipe', async () => {
    // user types on input
    const input = getByRole('textbox');

    server.use(
      rest.get('https://api.spoonacular.com/recipes/complexSearch', (req, res, ctx) => {
        return res.once(ctx.json(mockedResponse));
      })
    );

    fireEvent.change(input, { target: { value: 'kale' } });
    fireEvent.submit(input);

    await waitFor(() => {
      for (let i = 0; i < searchRecipeTitles.length; i++) {
        expect(getByText(searchRecipeTitles[i])).toBeInTheDocument();
      }

      for (let i = 0; i < randomRecipeTitles.length; i++) {
        expect(queryByText(randomRecipeTitles[i])).not.toBeInTheDocument();
        expect(queryByText(glutenFreeRecipeTitles[i])).not.toBeInTheDocument();
      }
    });

    // user clicks page 3
    server.use(
      rest.get('https://api.spoonacular.com/recipes/complexSearch', (req, res, ctx) => {
        return res.once(ctx.json(mockedResponsePage3));
      })
    );

    const page3 = getByText('3');

    fireEvent.click(page3);

    await waitFor(() => {
      for (let i = 0; i < searchRecipeTitlesPage3.length; i++) {
        expect(getByText(searchRecipeTitlesPage3[i])).toBeInTheDocument();
      }

      for (let i = 0; i < searchRecipeTitles.length; i++) {
        expect(queryByText(searchRecipeTitles[i])).not.toBeInTheDocument();
      }
    });

    // user clicks on a recipe
    server.use(
      rest.get('https://api.spoonacular.com/recipes/:id/information', (req, res, ctx) => {
        return res.once(ctx.json(recipeMockedResponse));
      })
    );

    const recipe = getByText(recipeMockedResponse.title);

    fireEvent.click(recipe);

    await waitFor(() => {
      expect(getByText(recipeMockedResponse.title)).toBeInTheDocument();
      expect(getByText('Ingredients:')).toBeInTheDocument();
      expect(getByText('Instructions:')).toBeInTheDocument();
      expect(getByText('Nutrition')).toBeInTheDocument();
    });
  });

  test('should load cuisine page when user clicks on a category, able to navigate to other pages, and view a recipe page', async () => {
    const americanLink = getAllByRole('link')[1];

    server.use(
      rest.get('https://api.spoonacular.com/recipes/complexSearch', (req, res, ctx) => {
        return res.once(ctx.json(mockedResponse));
      })
    );

    fireEvent.click(americanLink);

    expect(americanLink).toHaveClass('active');

    await waitFor(() => {
      for (let i = 0; i < searchRecipeTitles.length; i++) {
        expect(getByText(searchRecipeTitles[i])).toBeInTheDocument();
      }

      for (let i = 0; i < randomRecipeTitles.length; i++) {
        expect(queryByText(randomRecipeTitles[i])).not.toBeInTheDocument();
        expect(queryByText(glutenFreeRecipeTitles[i])).not.toBeInTheDocument();
      }
    });

    // user clicks page 3
    server.use(
      rest.get('https://api.spoonacular.com/recipes/complexSearch', (req, res, ctx) => {
        return res.once(ctx.json(mockedResponsePage3));
      })
    );

    const page3 = getByText('3');

    fireEvent.click(page3);

    await waitFor(() => {
      for (let i = 0; i < searchRecipeTitles.length; i++) {
        expect(queryByText(searchRecipeTitles[i])).not.toBeInTheDocument();
      }

      for (let i = 0; i < searchRecipeTitlesPage3.length; i++) {
        expect(getByText(searchRecipeTitlesPage3[i])).toBeInTheDocument();
      }
    });

    // user clicks on a recipe
    server.use(
      rest.get('https://api.spoonacular.com/recipes/:id/information', (req, res, ctx) => {
        return res.once(ctx.json(recipeMockedResponse));
      })
    );

    const recipe = getByText(recipeMockedResponse.title);

    fireEvent.click(recipe);

    await waitFor(() => {
      expect(getByText(recipeMockedResponse.title)).toBeInTheDocument();
      expect(getByText('Ingredients:')).toBeInTheDocument();
      expect(getByText('Instructions:')).toBeInTheDocument();
      expect(getByText('Nutrition')).toBeInTheDocument();
    });
  });
});
