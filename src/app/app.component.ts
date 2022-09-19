import { Router } from '@angular/router';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'Flipkart';

  constructor(private router:Router){

  }

  ngOnInit(){}

isAdmin:boolean = false;
  ngDoCheck(){
    
    if(this.router.url === "/admin")
      this.isAdmin = true;
      else this.isAdmin = false;
  }

}
