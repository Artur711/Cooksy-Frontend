import {RecipeProduct} from "./recipe-product";

export interface RecipeDetails {
  recipeId: number;
  tittle: string;
  image: string;
  description: string;
  pricePerServing: number;
  sourceUrl: number;
  readyInMinutes: number;
  products: RecipeProduct[];
}
