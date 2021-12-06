import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';

@Component({
  selector: 'app-xy-dhiva',
  templateUrl: './xy-dhiva.component.html',
  styleUrls: ['./xy-dhiva.component.css']
})
export class XyDhivaComponent implements OnInit {
  root: am5.Root;
  chart: am5xy.XYChart;
  xAxis: am5xy.CategoryAxis<AxisRenderer> | am5xy.ValueAxis<AxisRenderer>;
  yAxis: am5xy.ValueAxis<AxisRenderer>;
  series: am5xy.ColumnSeries;
  data: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  initializeChart() {
    this.root = am5.Root.new("chartdiv");
    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX"
      }));

    this.addCursor();
    this.addAxis();
    this.addSeries();
    this.setOrientation();
    this.generateChart();
  }

  addCursor() {
    let cursor = this.chart.set("cursor", am5xy.XYCursor.new(this.root, {
      behavior: "zoomX"
    }));
    cursor.lineY.set("visible", false);
  }

  addAxis() {
    // this.xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(this.root, {
    //   categoryField: "manufacturername_desc_perioddt_desc",
    //   renderer: <AxisRenderer>am5xy.AxisRendererX.new(this.root, {})
    // }));

    this.xAxis = this.chart.xAxes.push(am5xy.ValueAxis.new(this.root, {
      renderer: <AxisRenderer>am5xy.AxisRendererX.new(this.root, {})
    }));

    this.yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(this.root, {
      renderer: <AxisRenderer>am5xy.AxisRendererY.new(this.root, {})
    }));
  }

  addSeries() {
    this.series = this.chart.series.push(am5xy.ColumnSeries.new(this.root, {
      name: "Series",
      xAxis: this.xAxis,
      yAxis: this.yAxis,
      valueYField: "ik2xqh03tya_h694xcs2nmn",
      valueXField: "beforeweeks",
      tooltip: am5.Tooltip.new(this.root, {
        labelText: "{valueY}"
      })
    }));
  }

  setOrientation() {
    this.chart.set("scrollbarX", am5.Scrollbar.new(this.root, {
      orientation: "horizontal"
    }));
  }

  getData() {
    this.http.get("assets/column.json").subscribe((data: any) => {
      this.data = <any[]>data;
      this.initializeChart();
    });
  }

  generateChart() {
    this.series.data.setAll(this.data);
    this.series.appear(1000);
    this.chart.appear(1000, 100);
  }

}
