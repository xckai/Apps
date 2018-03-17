import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.less']
})
export class AppListComponent implements OnInit {
  constructor(private router:Router,private r:ActivatedRoute) {
   
   }
  apps:{name:string,url?:string}[]
  ngOnInit() {
    this.apps=[{name:"Servers",url:"/servers"},{name:"t2"}]
  }
  onClick(app:{name:string,url?:string}){
      this.router.navigate([app.url])
  }
 
}
