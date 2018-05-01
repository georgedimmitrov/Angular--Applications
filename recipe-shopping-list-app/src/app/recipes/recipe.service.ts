import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
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
      'https://cdn.pixabay.com/photo/2017/07/27/18/38/waffle-2546308_960_720.jpg',
      [
        new Ingredient('Waffle', 3),
        new Ingredient('Strawberry', 17)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
