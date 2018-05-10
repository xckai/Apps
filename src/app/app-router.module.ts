import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppListComponent} from "./app-list/app-list.component"
import { ServersComponent } from './server-manager/servers/servers.component';
import{SearchIndexComponent} from './searcher/search-index/search-index.component'
const routes:Routes=[
  {path:"",component:AppListComponent},
  {path:"search",component:SearchIndexComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true }) ],
  exports:[RouterModule]
})
export class AppRouterModule { }
