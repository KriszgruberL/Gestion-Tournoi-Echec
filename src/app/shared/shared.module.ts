import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { WorkingOnItComponent } from './components/working-on-it/working-on-it.component';
import {JwtInterceptor} from "./interceptors/jwt.interceptor";

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
  ], providers : [
  ]
})
export class SharedModule {}
