import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { ListExpComponent } from './list.component';
import { GiftExpComponent } from './gift.component';
import { AddExpComponent } from './add.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
    { path: '', component: ListExpComponent, canActivate:[AuthGuard] },
    { path: 'add', component: AddExpComponent, canActivate:[AuthGuard] },
    { path: 'gift', component: GiftExpComponent, canActivate:[AuthGuard] }
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
        GiftExpComponent
    ]
})

export class ExperienceModule {

}