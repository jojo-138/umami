import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  glutenFreeMockedResponse,
  randomMockedResponse,
  recipeMockedResponse
} from './mockResponses';

export const server = setupServer(
  rest.get('https://api.spoonacular.com/recipes/complexSearch', (req, res, ctx) => {
    return res(ctx.json(glutenFreeMockedResponse));
  }),
  rest.get('https://api.spoonacular.com/recipes/random', (req, res, ctx) => {
    return res(ctx.json(randomMockedResponse));
  }),
  rest.get('https://api.spoonacular.com/recipes/:id/information', (req, res, ctx) => {
    return res(ctx.json(recipeMockedResponse));
  })
);
