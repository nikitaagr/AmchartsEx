import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ChartId } from 'src/app/chart.model';
import { JsonService } from 'src/app/json.service';
type Position = 'start' | 'mid' | 'end';


@Component({
  selector: 'app-amchart',
  templateUrl: './amchart.component.html',
  styleUrls: ['./amchart.component.css']
})
export class AmchartComponent implements OnInit {
  @Output() selectShapeEvent = new EventEmitter();

  public options: any;
  dataChart: Array<any>;
  private chart2: AmChart;
  selectedRow: any;
  private timer: any;
  jsonData: Array<any> = [];
  employees: Array<any> = [];
  allEmployees: Array<any> = [];
  dataProvider: Array<any> = [];
  rowData: any;

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  constructor(
    private cdr: ChangeDetectorRef,
    private jsonService: JsonService
  ) {

  }

  ngOnInit() {
    this.getUsersData();
    this.options = this.makeOptions(this.makeRandomDataProvider());
    this.timer = setInterval(() => {
      this.options = this.makeOptions(this.makeRandomDataProvider());
    }, 3000);
  }



  ngOnDestroy() {
    if (!this.cdr['destroyed']) {
      this.cdr.detectChanges();
    }
  }



  makeRandomDataProvider() {
    let dataProvider = [];
    this.jsonService.getData()
      .subscribe((data: any): void => {
        this.jsonData = data;
      });
    this.jsonData.map(ele => {
      if (ele.Stall === 1) {
        dataProvider.push({
          year: ele.Hole_Depth,
          value: ele.Standpipe_Pressure,
          val: ele.Bit_Status + ' , ' + ele.Bit_Weight,
          stall: ele.Stall,
          row: ele.Row_no
        })
      }
    })
    this.dataChart = dataProvider
    // const dataProvider = [];
    // for (let i = 0; i <= 100000; i++) {
    //   if ((i % 2) == 0) {
    //     if ((i % 500 == 0)) {
    //       dataProvider.push({
    //         year: i,
    //         value: i
    //       })
    //     }
    //   }
    // }
    return dataProvider;
  }


  getUsersData() {
    this.jsonService.getUsersData()
      .subscribe((data: any): void => {
        this.employees = data,
          this.allEmployees = data;
      });

  }




  makeOptions(dataProvider) {

    return {
      'type': 'serial',
      'theme': 'none',
      'marginTop': 0,
      'marginRight': 80,
      "autoMarginOffset": 20,
      'dataProvider': dataProvider,
      "arrangeTooltips": true,
      'mouseWheelZoomEnabled': true,
      'mouseWheelScrollEnabled': true,
      "balloon": {
        "drop": true,
        "borderThickness": 1,
        "shadowAlpha": 0
      },

      'valueAxes': [{
        'axisAlpha': 0,
        "dashLength": 1,
        'position': 'left',
        'ignoreAxisWidth': true

      }],
      "series": [{
        "minBulletDistance": 20,
        "bullets": [{
          "type": "CircleBullet",
          "circle": {
            "radius": 5
          }
        }]
      }],
      'graphs': [{
        'id': 'g1',
        "balloon": {
          "hideBalloonTime": 1000,
          "disableMouseEvents": false,
          "fixedPosition": true,
          "drop": true,
        },
        'bullets': [{
          "isDynamic": true
        }],

        "balloonFunction": (obj) => {
          const dataContext = obj.dataContext;
          this.rowData = obj.dataContext;
          if (dataContext.stall === 1) {
            return `Stall : ${dataContext.stall} , Marker ${dataContext.year}<br><b><span style=\'font-size:15px;\'>${dataContext.val}</span></b><br><center><input type="button" value="More info" onclick="${this.adjustBalloonText(dataContext.row)}"/></center></b>`
          }
        },
        'bullet': 'round',
        "minBulletDistance": 30,
        'bulletColor': 'red',
        'bulletSize': 6,
        'lineColor': 'black',
        'lineThickness': 1,
        'negativeLineColor': '#637bb6',
        'valueField': 'value',
        "useLineColorForBulletBorder": true,
        "fillColorsField": "lineColor",
        "lineColorField": "lineColor",
      }],
      'trendLines': [{
        "lineColor": "#CC0000"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis": false,
        "offset": 30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount": true,
        "color": "#AAAAAA"
      },
      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha": 1,
        "cursorColor": "#258cbb",
        "limitToGraph": "g1",
        "valueLineAlpha": 0.2,
        "valueZoomable": true
      },
      "valueScrollbar": {
        "oppositeAxis": false,
        "offset": 50,
        "scrollbarHeight": 10
      },
      'categoryField': 'year',
      'categoryAxis': {
        "axisAlpha": 0,
        "gridAlpha": 0,
        "inside": true,
        "tickLength": 0,
        'minorGridAlpha': 0.1,
        'minorGridEnabled': true
      },
      'export': {
        'enabled': true
      }
    }

  }


  adjustBalloonText(id: number) {
    this.jsonService.broadcastNotification(id); // broadcasting by using service 
    this.selectShapeEvent.emit(id); // broadcasting by using ngrx
    this.selectShapeEvent.subscribe((emittedVal) => {
      console.log('This is emitted value' + emittedVal);
    });
    // this.getRowId();
  }

  // getRowId() {
  //   let scrollIndex: number;
  //   this.jsonService.newAddedNotificationData$.subscribe(res => {
  //     let obj = this.allEmployees.find(obj => obj.ID == res);
  //     scrollIndex = obj.ID;
  //     this.viewPort.scrollToIndex(scrollIndex, 'smooth');
  //   })
  // }



}
