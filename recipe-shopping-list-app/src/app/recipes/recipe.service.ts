import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Dessert Fruit',
      'A super tasty dessert better than dinner!',
      'https://www.maxpixel.net/static/photo/640/Nutella-Berries-Chocolate-Dessert-Sweet-Dish-Ice-1786311.jpg',
      [
        new Ingredient('Blueberry', 7),
        new Ingredient('Chocolate', 3)
      ]
    ),
    new Recipe(
      'Waffle with Strawberries',
      'Simple waffles with strawberries!',
      'https://c.pxhere.com/photos/9d/be/ice_cream_sundae_summer_delicious_ice_ice_cream_feasting_sweet_dessert-1171644.jpg!d',
      [
        new Ingredient('Waffle', 3),
        new Ingredient('Strawberry', 17)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
