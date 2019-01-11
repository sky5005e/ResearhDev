import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { ListExpComponent } from './list.component';
import { GiftExpComponent } from './gift.component';
import { AddExpComponent } from './add.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from '../services/auth-guard.service';
import { DetailExpComponent } from './detail.component';

const routes: Routes = [
    { path: 'list', component: ListExpComponent, canActivate:[AuthGuard] },
    { path: 'add', component: AddExpComponent, canActivate:[AuthGuard] },
    { path: 'gift', component: GiftExpComponent, canActivate:[AuthGuard] },    
    { path: 'detail', component: DetailExpComponent, canActivate:[AuthGuard] }
];
@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        ListExpComponent,
        AddExpComponent,
        GiftExpComponent,
        DetailExpComponent
    ]
})

export class ExperienceModule {

}