import { ChartId } from './../chart.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-preview',
  templateUrl: './chart-preview.component.html',
  styleUrls: ['./chart-preview.component.css']
})
export class ChartPreviewComponent implements OnInit {

  @Input() chartTag: ChartId;

  constructor() { }
  ngOnInit() {

  }
  ngOnChanges() {
    // console.log("changes", this.chartTag.id);
  }



}
