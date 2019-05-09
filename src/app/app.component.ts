import { Component,OnInit} from "@angular/core";

import * as firebase from 'firebase/app';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDuj3V07BFATNhPz3EcLrGxS4RI8fvOd4I",
      authDomain: "shopping-project-99574.firebaseapp.com"
    })
  }
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
