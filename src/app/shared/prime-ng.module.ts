import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { ChipsModule } from 'primeng/chips';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  exports: [
    SidebarModule,
    ButtonModule,
    TabMenuModule,
    MegaMenuModule,
    ChipsModule,
    PasswordModule,
    RippleModule
  ]
})
export class PrimeNgModule {}
