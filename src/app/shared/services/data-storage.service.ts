import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Recipe } from '../models/recipe.model';
import { AuthService } from '../../auth/auth.service';
import { RecipeService } from '../../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put(environment.recipes, recipes).subscribe((response) => {
      console.log(response);
      // display success message
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(environment.recipes).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
