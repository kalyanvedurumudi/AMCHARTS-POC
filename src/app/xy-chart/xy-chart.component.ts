import { Component, OnInit } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Micro from "@amcharts/amcharts5/themes/Micro";
import { AxisRenderer } from '@amcharts/amcharts5/.internal/charts/xy/axes/AxisRenderer';

@Component({
  selector: 'app-xy-chart',
  templateUrl: './xy-chart.component.html',
  styleUrls: ['./xy-chart.component.css']
})
export class XyChartComponent implements OnInit {
  root: am5.Root;
  chart: am5xy.XYChart;
  xAxis: am5xy.DateAxis<AxisRenderer>;
  yAxis: am5xy.ValueAxis<AxisRenderer>;
  series: am5xy.ColumnSeries

  constructor() { }

  ngOnInit(): void {
    this.initializeChart();
  }

  createRoot() {
    this.root = am5.Root.new("chartdiv");
    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
      }));
  }

  applyDefaultTheme() {
    this.root.setThemes([
      am5themes_Animated.new(this.root),
    ]);
  }
  
  overrideDefaultTheme() {
    const myTheme = am5.Theme.new(this.root);
    myTheme.rule("Label").setAll({
      fill: am5.color(0xFF0000),
      fontSize: "1.5em"
    });

    this.root.setThemes([
      am5themes_Micro.new(this.root),
      myTheme
    ]);
    this.renderChart();
  }

  enableCursorAndScrollBar() {
    let cursor = this.chart.set("cursor", am5xy.XYCursor.new(this.root, {
      behavior: "zoomX"
    }));
    cursor.lineY.set("visible", false);

    this.chart.set("scrollbarX", am5.Scrollbar.new(this.root, {
      orientation: "horizontal"
    }));
  }

  createAxis() {
    this.xAxis = this.chart.xAxes.push(am5xy.DateAxis.new(this.root, {
      maxDeviation: 0,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: <AxisRenderer>am5xy.AxisRendererX.new(this.root, {}),
      tooltip: am5.Tooltip.new(this.root, {})
    }));

    this.yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(this.root, {
      renderer: <AxisRenderer>am5xy.AxisRendererY.new(this.root, {})
    }));
  }

  createSeries() {
    this.series = this.chart.series.push(
      am5xy.ColumnSeries.new(this.root, {
        name: "Series",
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(this.root, {
          labelText: "{valueY}"
        })
    }));
  }

  addTemplateField() {
    this.series.columns.template.setAll({
      templateField: "columnSettings"
    });
  }

  addAdapters() {
    this.series.columns.template.adapters.add("fill", function (fill, target: any) {
      if (target && target.dataItem.get("valueY") < 100) {
        return am5.color(0x000000);
      }
      else {
        return fill;
      }
    });
  }

  addDefaultState() {
    this.series.columns.template.set("interactive", true);
    this.series.columns.template.states.create("hover", {
      fill: am5.color(0xFF0000),
      stroke: am5.color(0x000000)
    });
  }

  createCustomStateAndAddEvents() {
    this.series.columns.template.states.create("highlight", {
      fill: am5.color(0x14194b),
    });

    let selectedColumn: any;
    this.series.columns.template.events.on("click", function(ev) {
    let column = ev.target;
  
      if (selectedColumn) {
        column.states.applyAnimate("default");
        selectedColumn = undefined;
      }
  
      column.states.applyAnimate("highlight");
      selectedColumn = column;
    });
  }

  enabledVisibleEvent() {
    this.series.on("visible", function(visible, target) {
      if (visible) {
        console.log("Series shown", target)
      }
      else {
        console.log("Series hidden", target)
      }
    });
  }

  addAnimation() {
    this.series.set('sequencedInterpolation', true);
    this.series.set('sequencedDelay', 50);
    this.series.appear(1000);
  }

  renderChart() {
    this.series.appear(1000);
    this.chart.appear(1000, 100);
  }
 
  initializeChart() {
    this.createRoot();
    this.applyDefaultTheme();
    this.enableCursorAndScrollBar();
    this.createAxis();
    this.createSeries();

    // this.addTemplateField();
    // this.addAdapters();
    this.createCustomStateAndAddEvents();
    this.enabledVisibleEvent();
    this.getData();
    this.renderChart();
  }

  getData() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;
    let data = this.generateData(50, date, value);
    this.series.data.setAll(data);
  }

  generateSingleData(date: any, value: any): any {
    value = Math.round((Math.random() * 10 - 5) + value);
    am5.time.add(date, "day", 1);
    return {
      date: date.getTime(),
      value: value
    };
  }

  generateData(count: any, date: any, value: any) {
    let data = [];
    for (var i = 0; i < count; ++i) {
      const eachData = this.generateSingleData(date, value);
      eachData['columnSettings'] = {
        fill: am5.color(this.getColor(i % 10))
      }
      data.push(eachData);
    }
    return data;
  }

  getColor(i: number) {
    switch (i) {
      case 1:
        return 0xd6e681;
      case 2:
        return 0xbabf95;
      case 3:
        return 0xc4ad83;
      case 4:
        return 0xc6b677;
      case 5:
        return 0xdbb957;
      default:
        return 0xbabf95;

    }
  }

}
