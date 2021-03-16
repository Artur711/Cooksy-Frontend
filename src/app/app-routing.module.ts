import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeComponent} from "./recipe/recipe.component";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {HomeComponent} from "./home/home.component";
import {FavoritesComponent} from "./favorites/favorites.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {FrontPageComponent} from "./front-page/front-page.component";
import {MenuComponent} from "./menu/menu.component";
import {AlwaysAuthGuard} from "./guards/always-auth.guard";

import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', redirectTo: '/cooksy', pathMatch: 'full'},
  { path: 'cooksy', component: FrontPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard],
  children: [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'recipes', component: RecipeComponent, canActivate: [AuthGuard]},
    { path: 'recipes/:page', component:RecipeComponent, canActivate: [AuthGuard]},
    { path: 'recipes/detail/:id', component: RecipeDetailsComponent, canActivate: [AuthGuard]},
    { path: 'shopping-lists', component: ShoppingListComponent, canActivate: [AuthGuard]},
    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
    { path: 'favorites/detail/:id', component: RecipeDetailsComponent, canActivate: [AuthGuard]},
    // { path: 'setting', component: HomeComponent, canActivate: [AuthGuard]}
    ]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
