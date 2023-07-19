import Recipe from './Recipe';
import { recipeMockedResponse } from '../../mocks/mockResponses';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { server } from '../../mocks/mockServer';

describe('Recipe component', () => {
  const { getAllByRole, getByText, findByText, queryByText } = screen;
  const nutrition = recipeMockedResponse.nutrition.nutrients.slice(0, 9).map((item) => item.name);

  beforeAll(() => server.listen());
  beforeEach(() =>
    render(
      <MemoryRouter>
        <Recipe />
      </MemoryRouter>
    )
  );
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('should show instructions and nutrition when user clicks', async () => {
    const [instructionsButton, nutritionBtn] = getAllByRole('button');

    await findByText('Kale Chips with Parmesan Cheese and Garlic');

    // initially, instructions button is active
    expect(instructionsButton).toHaveClass('active');
    expect(nutritionBtn).not.toHaveClass('active');

    // user clicks Nutrition button
    fireEvent.click(nutritionBtn);

    expect(instructionsButton).not.toHaveClass('active');
    expect(nutritionBtn).toHaveClass('active');
    expect(queryByText('Ingredients:')).not.toBeInTheDocument();

    for (let i = 0; i < nutrition.length; i++) {
      expect(getByText(nutrition[i])).toBeInTheDocument();
    }

    // user clicks Instructions button
    fireEvent.click(instructionsButton);

    expect(instructionsButton).toHaveClass('active');
    expect(nutritionBtn).not.toHaveClass('active');
    expect(queryByText('Amount per Serving')).not.toBeInTheDocument();
    expect(getByText('Ingredients:')).toBeInTheDocument();
  });
});
