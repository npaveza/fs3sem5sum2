import { Routes } from '@angular/router';

// Importa los componentes necesarios
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RecoverPasswordComponent } from './components/auth/recover-password/recover-password.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { Error404Component } from './pages/error404/error404.component';
import { ForoComponent } from './pages/foro/foro.component';
import { PostDetailComponent } from './pages/foro/post-detail/post-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { MisPublicacionesComponent } from './pages/mis-publicaciones/mis-publicaciones.component';

import { ComentariosComponent } from './admin/comentarios/comentarios.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PublicacionesComponent } from './admin/publicaciones/publicaciones.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'recuperar-password', component: RecoverPasswordComponent },
    { path: 'perfil', component: ProfileComponent },
    { path: 'foro', component: ForoComponent },
    { path: 'foro/:id', component: PostDetailComponent },
    { path: 'mis-publicaciones', component: MisPublicacionesComponent },

    // Admin
    {
        path: 'admin',
        component: DashboardComponent,
        children: [
            { path: 'publicaciones', component: PublicacionesComponent },
            { path: 'comentarios', component: ComentariosComponent }
        ]
    },

    // Página no encontrada
    { path: '**', component: Error404Component }
];