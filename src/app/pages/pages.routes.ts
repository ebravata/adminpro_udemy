import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';

// se importa el Guard para proteger las rutas de 'pages'
import { LoginGuardGuard } from '../services/services.index';
import { AdminGuard } from '../services/services.index'; // proteger acceso a usuarios


import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guard/verifica-token.guard';


const pagesRoutes: Routes = [
    { 
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [ VerificaTokenGuard],
        data:{ titulo: 'Dashboard'} },
    { path: 'progress', component: ProgressComponent, data:{ titulo: 'Progress'}  },
    { path: 'graficas1', component: Graficas1Component, data:{ titulo: 'Gráficas'}  },
    { path: 'account-settings', component: AccountSettingsComponent, data:{ titulo: 'Ajustes del tema'}  },
    { path: 'perfil', component: ProfileComponent, data:{ titulo: 'Perfíl de usuario'}  },
    { path: 'promesas', component: PromesasComponent, data:{ titulo: 'Promesas'}  },
    { path: 'rxjs', component: RxjsComponent, data:{ titulo: 'RxJs'}  },
    { path: 'busqueda/:termino', component: BusquedaComponent, data:{ titulo: 'Busqueda en todas las colecciones'}  },

    //Rutas de mantenimiento
    { 
        path: 'usuarios', 
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data:{ titulo: 'Mantenimiento de usuario'}  
    },
    { path: 'hospitales', component: HospitalesComponent, data:{ titulo: 'Mantenimiento de hospital'}  },
    { path: 'medicos', component: MedicosComponent, data:{ titulo: 'Mantenimiento de Médicos'}  },
    { path: 'medico/:id', component: MedicoComponent, data:{ titulo: 'Datos del Médico'}  },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
