import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RWrapper, Info, Button, Table } from '../style';

const Recipe = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    image: '',
    servings: '',
    readyInMinutes: '',
    sourceUrl: ''
  });
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [activeButton, setActiveButton] = useState('instructions');
  const [nutrients, setNutrients] = useState([]);
  const { id } = useParams();

  const getRecipe = async (id) => {
    const response = await fetch(
      // eslint-disable-next-line no-undef
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}&includeNutrition=true`
    );
    const data = await response.json();
    setRecipe({
      title: data.title,
      image: data.image,
      servings: data.servings,
      readyInMinutes: data.readyInMinutes,
      sourceUrl: data.sourceUrl
    });
    setIngredients(data.extendedIngredients);
    setInstructions(data.analyzedInstructions[0].steps);
    setNutrients(data.nutrition.nutrients.slice(0, 9));
  };

  useEffect(() => {
    getRecipe(id);
  }, [id]);

  return (
    <RWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <div>
        <h3>{recipe.title}</h3>
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <Info>
        <div>
          <Button
            className={activeButton === 'instructions' ? 'active' : ''}
            onClick={() => setActiveButton('instructions')}>
            Instructions
          </Button>
          <Button
            className={activeButton === 'nutrition' ? 'active' : ''}
            onClick={() => setActiveButton('nutrition')}>
            Nutrition
          </Button>
        </div>
        {activeButton === 'instructions' ? (
          <div>
            <p>Servings: {recipe.servings}</p>
            <p>Preparation Time: {recipe.readyInMinutes} minutes</p>
            <h4>Ingredients:</h4>
            <ul>
              {ingredients.map((ingredient, i) => {
                return (
                  <li key={i}>
                    {ingredient.amount} {ingredient.measures.us.unitShort}{' '}
                    <strong>{ingredient.name}</strong>
                    {ingredient.meta?.map((str) => {
                      return <span key={str}>, {str}</span>;
                    })}
                  </li>
                );
              })}
            </ul>
            <h4>Instructions:</h4>
            <ol>
              {instructions.length ? (
                instructions.map((instruction) => {
                  return <li key={instruction.number}>{instruction.step}</li>;
                })
              ) : (
                <div>
                  <p>Head over to the original source for instructions!</p>
                  <a href={recipe.sourceUrl}>Original Source</a>
                </div>
              )}
            </ol>
          </div>
        ) : (
          <div className="container">
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Amount per Serving</th>
                  <th>% Daily Value</th>
                </tr>
              </thead>
              <tbody>
                {nutrients.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <strong>{item.name}</strong>
                      </td>
                      <td>
                        {item.amount} {item.unit}
                      </td>
                      <td>{item.percentOfDailyNeeds}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </Info>
    </RWrapper>
  );
};

export default Recipe;
