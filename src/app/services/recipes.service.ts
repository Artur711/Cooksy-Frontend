import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, mapTo} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Recipes} from "../models/recipes";
import {RecipeDetails} from "../models/recipeDetails";
import {RecipeProduct} from "../models/recipe-product";
import {TypeDish} from "../models/type";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipesUrl = `${environment.apiUrl}/recipes`



  constructor(private http: HttpClient) {
  }

  getRecipes(): Observable<Recipes> {
    return this.http
      .get<Recipes>(this.recipesUrl).pipe(
        catchError(this.handleError<Recipes>('getRecipes'))
      );
  }

  getRecipesPage$(page: number, ingredients: string[], equipments: string[], types: TypeDish[]): Observable<Recipes> {
    const ingredient = this.getStrFromArray(ingredients);
    const equipment = this.getStrFromArray(equipments);
    const type = this.getStrFromArray(types.filter(type => type.isChecked)
      .map(type => type.name.replace(' ', '%20')))

    const ingredientPar = ingredient != '' ? `&ingredients=${ingredient}` : '';
    const equipmentPar = equipment != '' ? `&equipments=${equipment}` : '';
    const typePar = type != '' ? `&types=${type}` : '';
    const url = `${this.recipesUrl}?start=${page}${ingredientPar}${equipmentPar}${typePar}`;

    return this.http.get<Recipes>(url).pipe(
      catchError(this.handleError<Recipes>('getRecipesPage'))
    );
  }

  getRecipeDetail$(id: string | null): Observable<RecipeDetails> {
    const url = `${this.recipesUrl}/recipe-detail/${id}`;
    return this.http.get<RecipeDetails>(url).pipe(
      catchError(this.handleError<RecipeDetails>(`getRecipeDetail id=${id}`))
    );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}/${error}`);
      return of(result as T);
    };
  }

  private getStrFromArray(array: string[]): string {
    return array.toString().replace(',', '-');
  }

}
