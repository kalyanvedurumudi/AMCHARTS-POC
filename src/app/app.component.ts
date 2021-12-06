import { Component, OnInit } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5pie from "@amcharts/amcharts5/percent";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'amcharts-poc';

  ngOnInit() {
    const root = am5.Root.new("chartdiv");
    const chart = root.container.children.push(
      am5pie.PieChart.new(
        root, {}
      )
    );

    const series = chart.series.push(
      am5pie.PieSeries.new(
        root, {
          valueField: "value",
          categoryField: "category"
        }
      )
    );

    series.data.setAll([{
      category: "Research",
      value: 1000
    }, {
      category: "Marketing",
      value: 1200
    }, {
      category: "Sales",
      value: 850
    }]);

  }
}
