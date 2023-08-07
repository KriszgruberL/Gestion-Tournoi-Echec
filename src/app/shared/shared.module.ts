import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { WorkingOnItComponent } from './components/working-on-it/working-on-it.component';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule,

  ],
  exports: [
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    WorkingOnItComponent
  ],
})
export class SharedModule {}
