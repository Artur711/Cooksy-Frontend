import { Injectable } from '@angular/core';
import {RecipeDetails} from "../models/recipeDetails";
import {environment} from "../../environments/environment";
import {catchError, mapTo} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FavoriteDto} from "../models/dto";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoriteUrl = `${environment.apiUrl}/favorites`

  constructor(private http: HttpClient) { }

  getFavorites$(): Observable<FavoriteDto[]> {
    return this.http.get<FavoriteDto[]>(this.favoriteUrl)
  }


  isFavorite$(recipeId: string | null): Observable<FavoriteDto> {
    return this.http.get<FavoriteDto>(`${this.favoriteUrl}/recipe/${recipeId}`);
  }

  addRecipeToFavorite(recipe: RecipeDetails) {
    return this.http.post<RecipeDetails>(this.favoriteUrl, recipe).pipe(
      mapTo(true),
      catchError(error => {
        console.log(error.error);
        return of(false);
      }));
  }

  removeRecipeFromFavorite(id: number) {
    return this.http.delete(`${this.favoriteUrl}/${id}`).pipe(
      mapTo(true),
      catchError(error => {
        console.log(error.error);
        return of(false);
      }));
  }
}
