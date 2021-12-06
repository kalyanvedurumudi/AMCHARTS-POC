import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XyChartComponent } from './xy-chart/xy-chart.component';
import { PieComponent } from './pie/pie.component';

const routes: Routes = [{
  path: 'xy',
  component: XyChartComponent
}, {
  path: 'pie',
  component: PieComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
