import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Headers, Http } from '@angular/http';
import * as _ from 'lodash'
export interface IApp{
  name:string,
  url?:string,
  newWindow?:Boolean
}
const hostname=window.location.hostname
const port= window.location.port
function PaserUrl(url:string){
     return _(url).replace('{hostname}',hostname).replace('{port}',port)
}
@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.less']
})

export class AppListComponent implements OnInit {
  constructor(private router:Router,private r:ActivatedRoute,private http:Http) {
    
  }
  apps:IApp[]
  ngOnInit() {
    this.apps=[]
    this.http.get("./api/get_config").subscribe(rs=>{
      this.apps=_(rs.json()).map(r=>{
        return{
          name:r.name,
          newWindow:r.newWindow,
          url:PaserUrl(r.url)
        }
      }).value()
      console.log(this.apps)
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
