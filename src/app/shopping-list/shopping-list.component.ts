import { Ingrediant } from './../shared/ingrediant.model';
import { Component, OnInit} from '@angular/core';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit  {
  private subsription:Subscription;
ingrediants:Ingrediant[];
  constructor(private shoppingservice:ShoppingService) { }

  ngOnInit() {
    this.ingrediants=this.shoppingservice.getAll();
    this.shoppingservice.ingrediantsChanged.
    subscribe(
      (ingrediants:Ingrediant[])=>{
      this.ingrediants=ingrediants;
    });
  }
  onEditItem(index:number){
 this.shoppingservice.startingEditing.next(index)
  }
}
