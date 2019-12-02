import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system/system.component';

@NgModule({
    declarations: [
        SystemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SystemRoutingModule
    ]
})
export class SystemModule { }
