import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormComponent, ListComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BrandModule { }
