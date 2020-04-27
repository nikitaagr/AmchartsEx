import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JsonService } from './json.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Approutes, AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { getChartId } from './chart.reducer';
import { ChartComponent } from './chart/chart.component';
import { AmchartComponent } from './chart/amchart/amchart.component';
import { TableComponent } from './chart/table/table.component';
import { ChartPreviewComponent } from './chart-preview/chart-preview.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    AmchartComponent,
    TableComponent,
    ChartPreviewComponent
  ],
  imports: [
    AmChartsModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ chartTag: getChartId }),
    ScrollingModule,
    RouterModule.forRoot(Approutes, { enableTracing: false }),
    AppRoutingModule,

  ],
  providers: [JsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
