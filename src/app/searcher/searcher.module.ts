import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchIndexComponent } from './search-index/search-index.component';
import { SearchlistComponent } from './searchlist/searchlist.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SearchIndexComponent, SearchlistComponent]
})
export class SearcherModule { }
