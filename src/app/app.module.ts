import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppListComponent } from './app-list/app-list.component';
import { AppRouterModule } from './/app-router.module';
import { ServerManagerModule } from './server-manager/server-manager.module';



@NgModule({
  declarations: [
    AppComponent,
    AppListComponent,
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ServerManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
