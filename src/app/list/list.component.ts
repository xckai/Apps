import { Component, OnInit, TemplateRef } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as _ from "lodash"
export interface IApp{
  name:string,
  id:string,
  newWindow:boolean,
  url:string,
  status?:string
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class ListComponent implements OnInit {

  constructor(private http:Http,private modalService: NgbModal,private router:Router,) {
    
  }
  apps:IApp[]
  modalText:string
  modal:NgbModalRef
  ngOnInit() {
    this.http.get("./api/apps").subscribe(r=>{
      this.apps=r.json()
  
      _.each(this.apps,(v,i)=>{
        _.delay(()=>{
          this.http.get('/api/status/'+v.id).toPromise().then(r=>{
            let result=r.json();
            if(result.code==0){
              if(_.trim(result.exec)){
                 v.status='on'
              }else{
                v.status='off'
              }
            }else{
                v.status='off'
            }
          },()=>{
            v.status='off'
          })
        },i*500)
      })
    })
    
  }
  start(app:IApp,modalRef:TemplateRef<any>){
    this.modalText='Sending ...'
    this.modal = this.modalService.open(modalRef,{size:'lg'});
    
    this.http.post('/api/start/'+app.id,{}).toPromise().then(r=>{
      this.modalText=r.text()
    },r=>{
      this.modalText=_.toString(r)+"\\n"+r.text()
    })
  }
  stop(app:IApp,modalRef:TemplateRef<any>){
    this.modalText='Sending ...'
    this.modal = this.modalService.open(modalRef,{size:'lg'});
    this.http.post('/api/stop/'+app.id,{}).toPromise().then(r=>{this.modalText=r.text()},r=>{
      this.modalText=_.toString(r)+"\\n"+r.text()
    })
  }
  enter(app:IApp){
    if(app.newWindow){
      window.open(app.url)
    }else{
      this.router.navigate([app.url])
    }
  }
  setStatusClasses(app:IApp){
    return app.status
  }
  closeModal(modalRef:TemplateRef<any>){
    this.modal.close()
  }
}
