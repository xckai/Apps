import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
export interface IApp{
  name:string,
  id:string
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class ListComponent implements OnInit {

  constructor(private http:Http) {
    
  }
  apps:IApp[]
  ngOnInit() {
    this.http.get("./api/apps").subscribe(r=>{
      this.apps=r.json()
      console.log(r.json())
    })
  }

}
