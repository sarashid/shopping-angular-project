import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( private datastorageservice:DataStorageService,private authservice:AuthService) { }

  ngOnInit() {

  }
  onSaveData(){
    this.datastorageservice.storeRescipes().subscribe(
      (response:HttpEvent<object>)=>{
        console.log(response)}

    )
  }

  onFetchData(){
    this.datastorageservice.getRecipes();
  }

  onLogout(){
    this.authservice.logout();
  }
  isAuthenticated() {
    return this.authservice.isAuthenticated();
  }
}
