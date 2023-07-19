import Title from './Title';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

test('Title renders correctly', () => {
  expect(render(<Title />, { wrapper: MemoryRouter })).toMatchSnapshot();
});
