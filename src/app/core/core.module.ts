import { LoggingInterceptor } from './../shared/logging.interceptor';
import { AuthInterceptor } from "./../shared/auth.interceptor";
import { AppRoutingModule } from "./../app-routing.module";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ShoppingService } from "../shopping-list/shopping.service";
import { RecipesService } from "../recipes/recipes.service";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [
    SharedModule, //contain dropdown directive and we use it in header component
    AppRoutingModule
  ],
  providers: [
    ShoppingService,
    RecipesService,
    DataStorageService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ],
  exports: [AppRoutingModule, HeaderComponent]
})
export class CoreModule {}
