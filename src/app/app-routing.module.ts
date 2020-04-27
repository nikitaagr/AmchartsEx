import { ChartComponent } from './chart/chart.component';
import { TableComponent } from './chart/table/table.component';
import { AmchartComponent } from './chart/amchart/amchart.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



export const Approutes: Routes = [
    {
        path: 'amchart',
        component: AmchartComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'parent',
        component: ChartComponent
    },
    { path: '', redirectTo: '/amchart', pathMatch: 'full' }


];

@NgModule({
    imports: [RouterModule.forRoot(Approutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }