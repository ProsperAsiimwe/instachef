import { Recipe } from 'src/app/shared/models/recipe.model';
import * as recipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state = initialState,
  action: recipeActions.RecipesActions
) {
  switch (action.type) {
    case recipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };

    case recipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };

    case recipeActions.UPDATE_RECIPE:
      /**
       * 1. Find the recipe we want to update
       * 2. Copy it
       * 3. Change it
       * 4. Copy the list of recipes
       * 5. Replace the updated recipe in that copied list with the updated recipe
       * 6. Use that copied and changed list as a new list of recipes
       */
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };

      const updatedRecipes = [...state.recipes];

      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes,
      };

    case recipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        }),
      };
    default:
      return state;
  }
}
