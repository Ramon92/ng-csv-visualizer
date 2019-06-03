import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from '@ng-csv-visualizer/material'
import { FormsModule } from '@angular/forms';
import { SortService } from './sort.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [SortService],
  bootstrap: [AppComponent]
})
export class AppModule {}
