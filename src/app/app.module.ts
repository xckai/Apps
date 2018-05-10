import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppListComponent } from './app-list/app-list.component';
import { AppRouterModule } from './/app-router.module';
import { ServerManagerModule } from './server-manager/server-manager.module';
import { HttpModule, JsonpModule } from '@angular/http';
import {SearcherModule}from './searcher/searcher.module'


@NgModule({
  declarations: [
    AppComponent,
    AppListComponent,
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ServerManagerModule,
    HttpModule,
    SearcherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
