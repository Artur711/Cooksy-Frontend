import {RecipeDetails} from "./recipeDetails";

export interface Favorite {
  favoriteId: number;
  userId: number;
  recipe: RecipeDetails;
}
