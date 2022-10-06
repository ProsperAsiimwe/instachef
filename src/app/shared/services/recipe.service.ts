import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
  constructor(private shoppingListService: ShoppingListService) {}

  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Juicy lemon and garlic chicken',
      'The secret to this quick and delicious midweek roast dinner is butterflying the chicken - see video. And, adding to that, this dish will make its own pan sauce – no need for gravy! Serve with buttery mash and greens to soak up all that saucy goodness.',
      'https://img.taste.com.au/1WY7FVhF/w720-h480-cfill-q80/taste/2021/08/tca0821_mattp_web_copy-173021-1.jpg',
      [
        new Ingredient('lemons', 2),
        new Ingredient('garlic bulb, halved', 1),
        new Ingredient('small brown onions, peeled, sliced into thin rings', 2),
        new Ingredient('1.4kg whole chicken, butterflied', 1),
        new Ingredient('tbs sea salt', 1),
        new Ingredient('1/4 cup fresh basil leaves', 1),
        new Ingredient('1/4 cup fresh thyme leaves', 1),
        new Ingredient('60ml (1/4 cup) olive oil', 1),
        new Ingredient(
          '185ml (3/4 cup) salt-reduced or homemade chicken stock',
          1
        ),
      ]
    ),
    new Recipe(
      'Vegetarian mushroom moussaka',
      'This vegetarian version of the traditional Greek dish will transport you to sun-drenched beaches and whitewashed villages.',
      'https://img.taste.com.au/6Rr0DGPd/w643-h428-cfill-q90/taste/2020/06/creamy_pumpkin_sage_broccoli_spelt_pasta_bakes-162455-1.jpg',
      [
        new Ingredient('(about 1.3kg) eggplants', 3),
        new Ingredient('160ml (2⁄3 cup) extra virgin olive oil', 1),
        new Ingredient('1kg (4-5) desiree potatoes, peeled', 1),
        new Ingredient('600g Swiss brown mushrooms, thinly sliced', 1),
        new Ingredient('brown onion, coarsely chopped', 1),
        new Ingredient('garlic cloves, crushed', 6),
        new Ingredient('fresh thyme sprigs', 4),
        new Ingredient('tsp ground cinnamon', 1 / 2),
      ]
    ),
  ];

  getRecipes() {
    // return a new array which is an exact copy of the one in this service file instead of tapering with it's original array
    return this.recipes.slice();
  }

  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addMultipleIngredients(ingredients);
  }
}
