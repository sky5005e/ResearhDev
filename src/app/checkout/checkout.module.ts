import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from '../services/auth-guard.service';
import { PayNowComponent } from './paynow.component';
import { PaynowThankYouComponent } from './thank-you.component';

const routes: Routes = [
    { path: 'thank-you', component: PaynowThankYouComponent, canActivate:[AuthGuard] },
    { path: 'pay-now', component: PayNowComponent, canActivate:[AuthGuard] }
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
        PaynowThankYouComponent,
        PayNowComponent
    ]
})

export class CheckOutModule {

}