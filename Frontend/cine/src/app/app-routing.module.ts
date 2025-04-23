import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/Guards/auth.guard';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { MenuComponent } from './modules/menu/pages/menu/menu.component';
import { PeliculasAdminComponent } from './modules/peliculas/pages/peliculas-admin/peliculas-admin.component';
import { SalasComponent } from './modules/salas/pages/salas/salas.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
  
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [guestGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]  },
  { path: 'peliculas', component: PeliculasAdminComponent, canActivate: [authGuard]  },
  { path: 'salas', component: SalasComponent, canActivate: [authGuard]  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }