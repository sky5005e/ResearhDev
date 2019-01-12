import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from '../services/auth-guard.service';
import { UserProfilestep1Component } from './profilestep1.component';
import { UserProfilestep2Component } from './profilestep2.component';
import { UserProfilestep3Component } from './profilestep3.component';

const routes: Routes = [
    { path: 'profile-step1', component: UserProfilestep1Component, canActivate:[AuthGuard] },    
    { path: 'profile-step2', component: UserProfilestep2Component, canActivate:[AuthGuard] },
    { path: 'profile-step3', component: UserProfilestep3Component, canActivate:[AuthGuard] }
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
        UserProfilestep1Component,
        UserProfilestep2Component,
        UserProfilestep3Component
    ]
})

export class UserProfileModule {

}