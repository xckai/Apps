import { Component, OnInit } from '@angular/core';
import { SearchItemModel } from '../model';
import { Http } from '@angular/http';

@Component({
  selector: 'app-search-index',
  templateUrl: './search-index.component.html',
  styleUrls: ['./search-index.component.less']
})
export class SearchIndexComponent implements OnInit {

  constructor(private http:Http) { 
      //this.searchResult=[]

      //this.searchResult.push({name:"ss",size:"1.2g",popular:1111,createTime:new Date(),infoCode:"ssss"})
  }
  searchKey:string
  searchResult:SearchItemModel[]
  ngOnInit() {
  
  }
  onSearch(){
   
    this.http.get("/api/search/"+this.searchKey).subscribe(r=>{
      this.searchResult=r.json()
    })
  }
  addTask(sr:SearchItemModel){
    this.http.post("/api/addurltask/"+sr.infoCode,{}).subscribe(r=>{
       let rs=r.json()
       if(rs.result!="success"){
         alert(rs.result)
       }else{
         sr.downloaded=true;
       }
    })
  }
}
