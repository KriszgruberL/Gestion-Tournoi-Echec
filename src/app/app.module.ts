import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GestionTournoiModule } from './gestion-tournoi/gestion-tournoi.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import {MessageService} from "primeng/api";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./shared/interceptors/jwt.interceptor";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    CoreModule,
    SharedModule,
  ],
  providers: [MessageService,
    { provide : HTTP_INTERCEPTORS, useClass : JwtInterceptor, multi : true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
