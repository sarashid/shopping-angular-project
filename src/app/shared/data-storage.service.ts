import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import { AuthService } from "./../auth/auth.service";
import { Recipe } from "./../recipes/recipe.model";
import { Injectable } from "@angular/core";
import { RecipesService } from "../recipes/recipes.service";
import "rxjs/Rx";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeservice: RecipesService,
    private authservice: AuthService
  ) {}

  storeRescipes() {
    // const headers= new HttpHeaders().set('authorization','gyghghjghf');
    // return this.httpClient.put(
    //   "https://shopping-project-99574.firebaseio.com/recipes.json",
    //   this.recipeservice.getAll(),
    //   {
    //     observe: "body",
    //     params: new HttpParams().set("auth", token)
    //     // headers: headers
    //   }
    // );
    const req = new HttpRequest(
      "PUT",
      "https://shopping-project-99574.firebaseio.com/recipes.json",
      this.recipeservice.getAll(),
      {
        reportProgress: true
      }
    );
    return this.httpClient.request(req);
  }

  getRecipes() {

    this.httpClient
      .get<Recipe[]>(
        "https://shopping-project-99574.firebaseio.com/recipes.json",
        {
          observe: "body",
          responseType: "json"
        }
      )
      .map(recipes => {
        console.log(recipes);

        for (let recipe of recipes) {
          if (!recipe["ingrediants"]) {
            recipe["ingrediants"] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeservice.setRecipes(recipes);
      });
  }
}
