import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XyChartComponent } from './xy-chart/xy-chart.component';
import { PieComponent } from './pie/pie.component';
import { XyDhivaComponent } from './xy-dhiva/xy-dhiva.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    XyChartComponent,
    PieComponent,
    XyDhivaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
