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
// import { IncrementadorComponent } from './components/incrementador/incrementador.component';

// - Los siguientes componentes se eliminaron al crearse los modulos correspondientes para cada seccion (carpeta)
// import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { ProgressComponent } from './pages/progress/progress.component';
// import { Graficas1Component } from './pages/graficas1/graficas1.component';
// import { HeaderComponent } from './shared/header/header.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { BreadcrumsComponent } from './shared/breadcrumbs/breadcrums.component';
// import { PagesComponent } from './pages/pages.component';

// Modulos hijos
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';
// import { ImagenesPipe } from './pipes/imagenes.pipe'; se quita de aqui para ponerlo en un modulo exclusivo

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    // ImagenesPipe,
    // IncrementadorComponent
    // NopagefoundComponent,
    // DashboardComponent,
    // ProgressComponent,
    // Graficas1Component,
    // PagesComponent,
    // HeaderComponent,
    // SidebarComponent,
    // BreadcrumsComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    PagesModule,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
