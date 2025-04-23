import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormatDatePipe } from './shared/pipes/formatDate';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; 
import { MinValueDirective } from './shared/directives/participantesMinimos';
import { OnlyNumberDirective } from './shared/directives/onlyNumber';
import { CapitalizePipe } from './shared/pipes/letraMayuscula'; 
import { ValidateUrlPipe } from './shared/pipes/linkValidate'; 
import { Error404Interceptor } from './core/middleware/errorStatus.interceptor';
import { PreventDuplicateRequestsInterceptor } from './core/middleware/prevent-duplicate-request.interceptor';
import { TimeoutInterceptor } from './core/middleware/timeoute.interceptor';
import { AuthInterceptor } from './core/middleware/auth.interceptor';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginModule } from './modules/login/login/login.module';
import { SalasModule } from './modules/salas/salas.module';
import { SalasComponent } from './modules/salas/pages/salas/salas.component';
import { SalaFormComponent } from './modules/salas/components/sala-form/sala-form.component';
import { SalaListComponent } from './modules/salas/components/sala-list/sala-list.component';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { LoginFormComponent } from './modules/login/components/login-form/login-form.component';
import { MenuComponent } from './modules/menu/pages/menu/menu.component';
import { PeliculasFormComponent } from './modules/peliculas/components/peliculas-form/peliculas-form.component';
import { PeliculasAdminComponent } from './modules/peliculas/pages/peliculas-admin/peliculas-admin.component';
import { ConfirmDialogComponent } from './modules/peliculas/pages/confirm-dialog/confirm-dialog.component';
import { PeliculasSalasFormComponent } from './modules/peliculas/components/peliculas-salas-form/peliculas-salas-form.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FormatDatePipe,
    CapitalizePipe,
    ValidateUrlPipe, 
    MinValueDirective,
    OnlyNumberDirective,
    MenuComponent,
    LoginComponent,
    LoginFormComponent,
    DashboardComponent,
    SalasComponent,
    SalaFormComponent,
    SalaListComponent,
    PeliculasFormComponent,
    PeliculasAdminComponent,
    ConfirmDialogComponent,
    PeliculasSalasFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SalasModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,  
    NgApexchartsModule,
    MatDialogModule,

    FormsModule
  ],
  providers: [   DatePipe,
    { provide: 'LOCALE_ID', useValue: 'es-ES' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Error404Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: PreventDuplicateRequestsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true } ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() { 
    registerLocaleData(localeEs);
  }
 }
