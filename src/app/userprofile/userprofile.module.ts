import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from '../services/auth-guard.service';
import { UserProfilestep1Component } from './profilestep1.component';

const routes: Routes = [
    { path: 'profile-step1', component: UserProfilestep1Component, canActivate:[AuthGuard] }
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
        UserProfilestep1Component
    ]
})

export class UserProfileModule {

}