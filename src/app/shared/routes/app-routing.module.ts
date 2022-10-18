import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { RecipeDetailComponent } from 'src/app/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from 'src/app/recipes/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from 'src/app/recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from 'src/app/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from 'src/app/recipes/recipes.component';
import { ShoppingListComponent } from 'src/app/shopping-list/shopping-list.component';
import { AuthGuard } from '../guards/auth.guard';
import { RecipesResolverService } from '../resolvers/recipes-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    // only redirect if the full path is empty
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
      },
      {
        path: 'create',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
