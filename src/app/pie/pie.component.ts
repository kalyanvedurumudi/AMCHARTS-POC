import { Component, OnInit } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5pie from "@amcharts/amcharts5/percent";

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
