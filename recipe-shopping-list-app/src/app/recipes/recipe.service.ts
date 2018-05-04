import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
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

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
