import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/models/ingredient.model';
import { LoggingService } from '../shared/services/logging.service';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientChangedSubject: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangedSubject =
      this.shoppingListService.originalIngredientsChanged.subscribe(
        (newIngredients: Ingredient[]) => {
          this.ingredients = newIngredients;
        }
      );

    this.loggingService.printLog(
      'Hello from shopping list component ngOnInit!'
    );
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.ingredientChangedSubject.unsubscribe();
  }
}
