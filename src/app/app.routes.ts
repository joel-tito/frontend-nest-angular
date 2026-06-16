import { Routes } from '@angular/router';
import { ListaUsuariosPage } from './pages/lista-usuarios.page';
import { FormularioUsuarioPage } from './pages/formulario-usuario.page';

export const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: ListaUsuariosPage },
  { path: 'usuarios/nuevo', component: FormularioUsuarioPage },
  { path: 'usuarios/:id/editar', component: FormularioUsuarioPage },
];
