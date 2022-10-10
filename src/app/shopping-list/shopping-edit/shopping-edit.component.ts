import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('formRef', { static: false }) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListServiice: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListServiice.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListServiice.getOneIngredient(index);
        this.shoppingListForm.setValue({
          itemName: this.editedItem.name,
          itemAmount: this.editedItem.amount,
        });
      }
    );
  }

  onFormSubmit(form: NgForm) {
    const value = form.value;

    const newIngredient = new Ingredient(value.itemName, value.itemAmount);

    if (this.editMode) {
      this.shoppingListServiice.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListServiice.addIngredient(newIngredient);
    }

    this.editMode = false;
    form.reset();
  }

  onFormClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onItemDelete() {
    this.shoppingListServiice.deleteIngredient(this.editedItemIndex);
    this.onFormClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
