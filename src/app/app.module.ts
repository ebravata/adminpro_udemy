import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTING } from './app.routes';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
// import { IncrementadorComponent } from './components/incrementador/incrementador.component';

// - Los siguientes componentes se eliminaron al crearse los modulos correspondientes para cada seccion (carpeta)
// import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { ProgressComponent } from './pages/progress/progress.component';
// import { Graficas1Component } from './pages/graficas1/graficas1.component';
// import { HeaderComponent } from './shared/header/header.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { BreadcrumsComponent } from './shared/breadcrumbs/breadcrums.component';

// Modulos hijos
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';
// import { ImagenesPipe } from './pipes/imagenes.pipe'; se quita de aqui para ponerlo en un modulo exclusivo
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    // ImagenesPipe,
    // IncrementadorComponent
    // NopagefoundComponent,
    // DashboardComponent,
    // ProgressComponent,
    // Graficas1Component,
    // HeaderComponent,
    // SidebarComponent,
    // BreadcrumsComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    // PagesModule,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule,
    SharedModule // se agregó por el lazyload
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
