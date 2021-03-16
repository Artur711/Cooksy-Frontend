import {Recipe} from "./recipe";

export interface Recipes {
  limit: number;
  numberOfPages: number;
  page: number;
  recipes: Recipe[];
}
