import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XyChartComponent } from './xy-chart/xy-chart.component';
import { PieComponent } from './pie/pie.component';

@NgModule({
  declarations: [
    AppComponent,
    XyChartComponent,
    PieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
