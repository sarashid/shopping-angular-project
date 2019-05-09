import { Subject } from 'rxjs';
import { Ingrediant } from "./../shared/ingrediant.model";
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { ShoppingService } from "../shopping-list/shopping.service";

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      "salmon",
      "this is a fish nOt Chicken",
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/3/22/0/FNCC_bobby-flay-salmon-brown-sugar-mustard_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382541357316.jpeg",
      [new Ingrediant("salamon", 1), new Ingrediant("lemon", 2)]
    ),
    new Recipe(
      "Burger",
      "Yummy",
      "https://amp.businessinsider.com/images/5a7dc169d03072af008b4bf2-750-562.jpg",
      [new Ingrediant("meat", 3), new Ingrediant("bread", 2)]
    )
  ];

  recipesChanged=new Subject<Recipe[]>();
  constructor(private shoppingservice: ShoppingService) {}

  setRecipes(recipes:Recipe[]){
    this.recipes=recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getAll() {
    //use slice to get copy of array
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngrediantsToShoppingList(ingrediants: Ingrediant[]) {
    this.shoppingservice.addIngrediants(ingrediants);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newrecipe: Recipe) {
    this.recipes[index] = newrecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  onDelete(index:number ,rIngrediants:Ingrediant[]){
         this.recipes.splice(index,1);
         this.shoppingservice.deleteRecipeIngrediants(index,rIngrediants);
         this.recipesChanged.next(this.recipes.slice());
  }

}
