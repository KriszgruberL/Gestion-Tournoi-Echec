import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
  exports: [
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
