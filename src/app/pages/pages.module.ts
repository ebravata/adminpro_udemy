import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
// import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module'; // se importan los pipes aqui por que se usaran en las paginas

// rutas hijas de la aplicacion
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
// import { ModalUploadComponent } from './modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule ({
    declarations:[
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent, se quitaron por el Lazyload y se pasa al share.module
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    exports:[
        DashboardComponent,
        Graficas1Component,
        ProgressComponent ,
        // SharedModule se quitaron por el Lazyload
        // PagesComponent se quitaron por el Lazyload
    ],
    imports:[
        CommonModule,
        // SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})

export class PagesModule {};