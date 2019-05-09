import { AuthModule } from './auth/auth.module';
import { RecipesModule } from "./recipes/recipes.module";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { ShoppingModule } from './shopping-list/shopping.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RecipesModule,
    ShoppingModule,
    AuthModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
