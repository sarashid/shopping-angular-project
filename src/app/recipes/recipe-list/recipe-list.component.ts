import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit ,OnDestroy} from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[];
  subscription:Subscription;
  constructor(
    private recipeservice: RecipesService,
    private authservice:AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription=this.recipeservice.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeservice.getAll();
  }
  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  isAuthenticated(){
    return this.authservice.isAuthenticated(); 
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
