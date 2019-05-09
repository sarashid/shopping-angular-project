import { Recipe } from "./../recipe.model";
import { RecipesService } from "./../recipes.service";
import { ActivatedRoute, Params,Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipesservice: RecipesService,
    private router:Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
      console.log(true);
    });
  }

  get recipeIngrediants(){
    return (<FormArray>this.recipeForm.get('ingrediants')).controls;
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingrediants']
    // );
    if (this.editMode) {
      this.recipesservice.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipesservice.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngrediant() {
    (<FormArray>this.recipeForm.get("ingrediants")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  private initForm() {
    let recipeName = "";
    let recipeImgPath = "";
    let recipeDescription = "";
    let recipeIngrediants = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipesservice.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe["ingrediants"]) {
        for (const ingrediant of recipe.ingrediants) {
          recipeIngrediants.push(
            new FormGroup({
              name: new FormControl(ingrediant.name, Validators.required),
              amount: new FormControl(ingrediant.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingrediants: recipeIngrediants //formArray initialized in initForm method
    });
  }


  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onCancelIngrediant(index:number){
    (<FormArray>this.recipeForm.get("ingrediants")).removeAt(index)
  }
}
