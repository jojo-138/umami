import useFetch from './useFetch';
import { renderHook, waitFor } from '@testing-library/react';
import { glutenFreeMockedResponse, randomMockedResponse } from '../../mocks/mockResponses';
import { server } from '../../mocks/mockServer';

const sessionStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

describe('useFetch custom hook', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    jest.restoreAllMocks();
  });
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('should return initial states of recipes and totalResults and null sessionStorage', () => {
    const { result } = renderHook(() => useFetch('complexSearch', 9, 'diet', 'glutenFree', null));

    expect(result.current[0]).toEqual([]);
    expect(result.current[1]).toEqual(0);
    expect(window.sessionStorage.getItem('glutenFreenullresults')).toBeNull();
  });

  test('String is present: should return recipes and totalResults and store to sessionStorage', async () => {
    const { result } = renderHook(() => useFetch('complexSearch', 9, 'diet', 'glutenFree', null));

    await waitFor(() => {
      expect(result.current[0]).toEqual(glutenFreeMockedResponse.results);
      expect(result.current[1]).toEqual(glutenFreeMockedResponse.totalResults);
      expect(JSON.parse(window.sessionStorage.getItem('glutenFreenullresults'))).toEqual(
        glutenFreeMockedResponse.results
      );
      expect(JSON.parse(window.sessionStorage.getItem('glutenFreenulltotalResults'))).toEqual(
        glutenFreeMockedResponse.totalResults
      );
    });
  });

  test('String is null: should return recipes and totalResults', async () => {
    const { result } = renderHook(() => useFetch('random', 9, null, null, null));

    await waitFor(() => {
      expect(result.current[0]).toEqual(randomMockedResponse.recipes);
      expect(result.current[1]).toEqual(0);
    });
  });

  test('should get recipes and totalResults from sessionStorage', () => {
    const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
    const mockedSessionStorageReturn = {
      results: [
        {
          id: 716342,
          image: 'https://spoonacular.com/recipeImages/716342-312x231.jpg',
          title: 'Chicken Suya'
        },
        {
          id: 638420,
          image: 'https://spoonacular.com/recipeImages/638420-312x231.jpg',
          title: 'Chicken Wings'
        },
        {
          id: 638308,
          image: 'https://spoonacular.com/recipeImages/638308-312x231.jpg',
          title: 'Chicken Satay'
        }
      ],
      totalResults: 150
    };

    window.sessionStorage.setItem(
      'chicken1results',
      JSON.stringify(mockedSessionStorageReturn.results)
    );
    window.sessionStorage.setItem(
      'chicken1totalResults',
      JSON.stringify(mockedSessionStorageReturn.totalResults)
    );

    const { result } = renderHook(() => useFetch('complexSearch', 15, 'query', 'chicken', 1));

    expect(getItemSpy).toHaveBeenCalledWith('chicken1results');
    expect(getItemSpy).toHaveBeenCalledWith('chicken1totalResults');
    expect(result.current[0]).toEqual(mockedSessionStorageReturn.results);
    expect(result.current[1]).toEqual(mockedSessionStorageReturn.totalResults);
  });
});
