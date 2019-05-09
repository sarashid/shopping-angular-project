import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authservice:AuthService  ) { }

  ngOnInit() {
  }
  onSignup(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    this.authservice.signupUser(email,password);
console.log(form.value)
  }
}
