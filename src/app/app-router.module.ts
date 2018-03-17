import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppListComponent} from "./app-list/app-list.component"
import { ServersComponent } from './server-manager/servers/servers.component';
const routes:Routes=[
  {path:"",component:AppListComponent},
  {path:"servers",component:ServersComponent}
]
@NgModule({
  imports: [ RouterModule.forRoot(routes,{ useHash: true }) ],
  exports:[RouterModule]
})
export class AppRouterModule { }
