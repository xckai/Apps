import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Headers, Http } from '@angular/http';
export interface IApp{
  name:string,
  url?:string,
  newWindow?:Boolean
}
@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.less']
})

export class AppListComponent implements OnInit {
  constructor(private router:Router,private r:ActivatedRoute,private http:Http) {
    
  }
  apps:{name:string,url?:string}[]
  ngOnInit() {
    this.apps=[]
    this.http.get("./api/get_config").subscribe(r=>{
      this.apps=r.json()
      console.log(r.json())
    })
  }
  onClick(app:IApp){
      if(app.newWindow){
        window.open(app.url)
      }else{
        this.router.navigate([app.url])
      }
  }
 
}
