import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
// import { ProgressComponent } from './pages/progress/progress.component';
// import { Graficas1Component } from './pages/graficas1/graficas1.component';
// import { PagesComponent } from './pages/pages.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';

const appRoutes: Routes = [
    // {  Este path se mueve para colocarse dentro del nuevo archivo que contiene rutas hijas en el PAGES_ROUTES
    //     path: '', 
    //     component: PagesComponent,
    //     children: [
    //         { path: 'dashboard', component: DashboardComponent },
    //         { path: 'progress', component: ProgressComponent },
    //         { path: 'graficas1', component: Graficas1Component },
    //         { path: '', pathMatch:'full', redirectTo: '/dashboard' },
    //     ] },
    { path: 'login', component: LoginComponent, data:{ titulo: 'Login'} },
    { path: 'register', component: RegisterComponent, data:{ titulo: 'Registro'} },
    { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTING = RouterModule.forRoot(appRoutes, { useHash: true });
