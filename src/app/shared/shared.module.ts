import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Pipes Module
import { PipesModule } from '../pipes/pipes.module';  // se importa aqui para poder usarlos en los coponentes de la carpeta share

import { BreadcrumsComponent } from './breadcrumbs/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModalUploadComponent } from '../pages/modal-upload/modal-upload.component';




@NgModule({
    imports:[
        CommonModule,
        RouterModule,
        PipesModule
    ],
    declarations:[
        BreadcrumsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent,
        ModalUploadComponent
    ],
    exports:[
        BreadcrumsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent,
        ModalUploadComponent
    ]
})

export class SharedModule{};
