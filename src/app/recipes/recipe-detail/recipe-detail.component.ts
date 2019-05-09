import { AuthService } from './../../auth/auth.service';
import { RecipesService } from './../recipes.service';
import { ShoppingService } from './../../shopping-list/shopping.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

 recipe:Recipe;
 id:number;
  constructor(private recipeservice:RecipesService,
    private authservice:AuthService,
    private route:ActivatedRoute,
    private router:Router) {}

  ngOnInit() {
this.route.params.subscribe((params:Params)=>{
  this.id=+params['id'];
  this.recipe=this.recipeservice.getRecipe(this.id);
});
  }
  onAddToShoppingList(){
this.recipeservice.addIngrediantsToShoppingList(this.recipe.ingrediants);
  }
  onEditRecipe(){
this.router.navigate(['edit'],{relativeTo:this.route})
  }

  onDeleteRecipe(){
    this.recipeservice.onDelete(this.id,this.recipe.ingrediants);
    this.router.navigate(['/recipes'],{relativeTo:this.route});
  }

  isAuthenticated(){
    return this.authservice.isAuthenticated();
  }

}
