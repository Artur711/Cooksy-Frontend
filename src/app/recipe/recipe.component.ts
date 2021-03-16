import { Component, OnInit } from '@angular/core';
import {RecipesService} from "../services/recipes.service";
import {Recipe} from "../models/recipe";
import {TypeDish} from "../models/type";
import {Select} from "../models/select";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  ingredients: string[] = [];
  equipments: string[] = [];
  types: TypeDish[] = [];
  recipes: Recipe[] = [];
  pages = 1;
  page = 1;

  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.getPage();
  }

  getPage(): void {
    this.recipeService.getRecipesPage$(this.page, this.ingredients, this.equipments, this.types)
      // .pipe(
      //   debounceTime(120),
      //   distinctUntilChanged(),
      // )
      .subscribe(recipes => {this.recipes = recipes.recipes
      this.pages = recipes.numberOfPages
      this.page = recipes.page});
  }

  onSelectChange(select: Select): void {
    this.ingredients = select.ingredients;
    this.equipments = select.equipments;
    this.types = select.types;
    this.getPage();
  }
}
