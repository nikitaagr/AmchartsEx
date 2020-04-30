import { Component, OnInit, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartId } from 'src/app/chart.model';
import { JsonService } from 'src/app/json.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  // @Input() chartTag: ChartId;
  employees: Array<any> = [];
  allEmployees: Array<any> = [];
  tagState$: Observable<ChartId>;
  private newsubscribe: Subscription;
  chartTag: ChartId;
  constructor(
    private store: Store<ChartId>,
    private cdr: ChangeDetectorRef,
    private jsonService: JsonService,

  ) { this.tagState$ = store.select('chartTag'); }

  ngOnInit() {
    this.newsubscribe = this.tagState$.subscribe((state) => {
      this.chartTag = state;
      // console.log("inside subscribe table", this.chartTag);
      if (this.chartTag.id > 0) {
        this.getRowId();
      }
    });
    this.getUsersData();
  }


  ngOnDestroy() {
    this.newsubscribe.unsubscribe();
  }


  getUsersData() {
    this.jsonService.getUsersData()
      .subscribe((data: any): void => {
        this.employees = data,
          this.allEmployees = data;
      });
  }

  getRowId() {
    // console.log("inside table", this.chartTag)
    let scrollIndex: number;
    let obj = this.allEmployees.find(obj => obj.ID == this.chartTag.id);
    scrollIndex = obj.ID;
    this.viewPort.scrollToIndex(scrollIndex, 'smooth');
  }

}
