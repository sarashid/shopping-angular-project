import { Injectable } from "@angular/core";
import { Ingrediant } from "../shared/ingrediant.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShoppingService {
  ingrediantsChanged = new Subject<Ingrediant[]>();
  startingEditing = new Subject<number>();
  ingrediants: Ingrediant[] = [
    new Ingrediant("apple", 5),
    new Ingrediant("tomato", 2)
  ];
  constructor() {}
  getAll() {
    return this.ingrediants.slice();
  }

  getIngrediant(index: number) {
    return this.ingrediants[index];
  }

  addIngrediant(ingrediant: Ingrediant) {
    this.ingrediants.push(ingrediant);

    //use slice to take a copy from array
    this.ingrediantsChanged.next(this.ingrediants.slice());
  }

  addIngrediants(ingrediants: Ingrediant[]) {
    this.ingrediants.push(...ingrediants);
    this.ingrediantsChanged.next(this.ingrediants.slice());
  }

  updateIngrediant(index: number, newingrediant: Ingrediant) {
    this.ingrediants[index] = newingrediant;
    this.ingrediantsChanged.next(this.ingrediants.slice());
  }

  deleteIngrediant(index:number){
    this.ingrediants.splice(index,1);
    this.ingrediantsChanged.next(this.ingrediants.slice());
  }

  deleteRecipeIngrediants(index:number,rIngrediants:Ingrediant[]){
    this.ingrediants.splice(rIngrediants.length,rIngrediants.length);
    this.ingrediantsChanged.next(this.ingrediants.slice());
  }

}
