import { ChartId } from './../chart.model';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { SELECT_ID } from '../chart.action';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  tagState$: Observable<ChartId>;
  private tagStateSubscription: Subscription;
  chartTag: ChartId;
  done = false;
  constructor(
    private _store: Store<ChartId>
  ) {
    this.tagState$ = _store.select('chartTag');
  }


  ngOnInit() {
    this.tagStateSubscription = this.tagState$.subscribe((state) => {
      this.chartTag = state;
      this.done = !!(this.chartTag.id);
    });
  }

  ngOnDestroy() {
    this.tagStateSubscription.unsubscribe();
  }

  selectId(id: number) {
    this._store.dispatch({
      type: SELECT_ID,
      payload: id
    });
  }




}
