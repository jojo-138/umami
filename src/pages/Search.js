// import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, Shadow } from '../style';
import Page from '../components/Page';
import useFetch from '../hooks/useFetch';

const Search = () => {
  const { input, page } = useParams();
  const recipeArr = useFetch('complexSearch', 15, 'query', input, page);

  return (
    <div>
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}>
        {recipeArr[0].map((recipe) => {
          return (
            <Card to={`/recipe/${recipe.id}`} key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <p>{recipe.title}</p>
              <Shadow />
            </Card>
          );
        })}
      </Grid>
      <Page results={recipeArr[1]} type="search" input={input} currentPage={page} />
    </div>
  );
};

export default Search;
