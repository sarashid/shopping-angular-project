import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";

import { Ingrediant } from "./../../shared/ingrediant.model";
import { ShoppingService } from "../shopping.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit ,OnDestroy {
  @ViewChild('f') form:NgForm;
subscription:Subscription;
editmode=false;
editItemIndex:number;
editItem:Ingrediant;

  constructor(private shoppingservice:ShoppingService) {}

  ngOnInit() {
    this.subscription = this.shoppingservice.startingEditing.subscribe(
      (index:number)=>{
        this.editItemIndex=index;
        this.editmode=true;
        this.editItem=this.shoppingservice.getIngrediant(index);
        this.form.setValue({
          name:this.editItem.name,
          amount:this.editItem.amount
        })
      }
    );
  }
  onAddItem(form:NgForm) {
    const value=form.value
    const newIngridiant = new Ingrediant(value.name,value.amount);
    if(this.editmode){
      this.shoppingservice.updateIngrediant(this.editItemIndex,newIngridiant);
    } else{

      this.shoppingservice.addIngrediant(newIngridiant);
    }
    this.editmode=false;
    this.form.reset();
  }

  onClear(){
    this.editmode=false;
    this.form.reset();
  }

  onDelete(){
    this.shoppingservice.deleteIngrediant(this.editItemIndex);
    this.onClear();
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
