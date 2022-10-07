import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

export class ShoppingListService {
  originalIngredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Onions', 5),
    new Ingredient('Tomatoes', 2),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.originalIngredientsChanged.next(this.ingredients.slice());
  }

  addMultipleIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }

    this.ingredients.push(...ingredients);
    this.originalIngredientsChanged.next(this.ingredients.slice());
  }
}
