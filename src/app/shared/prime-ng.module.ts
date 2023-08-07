import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { ChipsModule } from 'primeng/chips';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import {CarouselModule} from "primeng/carousel";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {FieldsetModule} from "primeng/fieldset";
import {DividerModule} from "primeng/divider";

@NgModule({
  exports: [
    SidebarModule,
    ButtonModule,
    TabMenuModule,
    MegaMenuModule,
    ChipsModule,
    PasswordModule,
    RippleModule,
    CarouselModule,
    PaginatorModule,
    TableModule,
    FieldsetModule,
    DividerModule,
  ]
})
export class PrimeNgModule {}
