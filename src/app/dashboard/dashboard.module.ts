import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate:[AuthGuard]}
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    declarations: [ DashboardComponent]
})

export class DashboardModule {

}