import {RecipeDetails} from "./recipeDetails";

export interface LoginDto {
  username: string;
  password: string;
}

export interface UserDto {

  userId: number;
  nick: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoUrl: string;
  userTypeId: number;
}

export interface FavoriteDto {

  favoriteId: number;
  user: UserDto;
  recipe: RecipeDetails;
}

export interface ProductDto {
  strProductId: string;
  description: string;
  regularPrice: number;
  promoPrice: number;
  size: string;
  url: string;
}

export interface ProductsDto {
  start: number;
  limit: number;
  total: number;
  products: ProductDto[];
}
