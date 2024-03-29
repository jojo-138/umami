import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Wrapper, Card, Shadow } from '../style';
import useFetch from '../hooks/useFetch';

const GlutenFree = () => {
  const recipeArr = useFetch('complexSearch', 9, 'diet', 'glutenFree', null);

  return (
    <Wrapper>
      <h3 id="glutenfree-carousel">Gluten Free</h3>
      <Splide
        aria-labelledby="glutenfree-carousel"
        options={{
          speed: 500,
          perPage: 3,
          gap: '2rem',
          wheel: true,
          rewind: true,
          rewindByDrag: true,
          lazyLoad: 'nearby',
          arrows: false,
          pagination: true,
          breakpoints: {
            1050: {
              perPage: 2,
              gap: '1rem'
            },
            650: {
              perPage: 1
            }
          }
        }}>
        {recipeArr[0].map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card to={`/recipe/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} />
                <p>{recipe.title}</p>
                <Shadow />
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

export default GlutenFree;
