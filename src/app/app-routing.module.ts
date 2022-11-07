import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    // only redirect if the full path is empty
    pathMatch: 'full',
  },

  // Apply lazy loading on your routes to decouple rendering of your components
  {
    path: 'recipes',
    loadChildren: () =>
      import('src/app/recipes/recipes.module').then(
        (lazyLoad) => lazyLoad.RecipesModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.module').then(
        (lazyLoad) => lazyLoad.AuthModule
      ),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('src/app/shopping-list/shopping-list.module').then(
        (lazyLoad) => lazyLoad.ShoppingListModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
