import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://www.maxpixel.net/static/photo/640/Nutella-Berries-Chocolate-Dessert-Sweet-Dish-Ice-1786311.jpg'
    ),
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://www.maxpixel.net/static/photo/640/Nutella-Berries-Chocolate-Dessert-Sweet-Dish-Ice-1786311.jpg'
    )
  ];

  constructor() {}

  ngOnInit() {}
}
