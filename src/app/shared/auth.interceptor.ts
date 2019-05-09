import { HttpInterceptor, HttpHandler, HttpEvent,HttpRequest } from "@angular/common/http";
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authservice:AuthService){}
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    console.log('intercepted',req);
    const copiedReq=req.clone({params:req.params.set('auth',this.authservice.getToken())});
    return next.handle(copiedReq);
  }
}
