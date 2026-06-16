import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../interfaces/usuario.interface';
import { TablaUsuariosComponent } from '../components/tabla-usuarios.component';
import { ModalConfirmacionComponent } from '../components/modal-confirmacion.component';

@Component({
  selector: 'app-lista-usuarios',
  imports: [RouterLink, TablaUsuariosComponent, ModalConfirmacionComponent],
  template: `
    <div class="mx-auto max-w-5xl px-4 py-10">
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Usuarios</h1>
        <a
          routerLink="/usuarios/nuevo"
          class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          + Nuevo usuario
        </a>
      </div>

      @if (cargando()) {
        <div class="flex justify-center py-20">
          <div class="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      } @else {
        <app-tabla-usuarios
          [usuarios]="usuarios()"
          (editar)="irAEditar($event)"
          (eliminar)="confirmarEliminar($event)"
        />
      }
    </div>

    <app-modal-confirmacion
      [abierto]="modalAbierto()"
      mensaje="¿Estás seguro de eliminar este usuario?"
      (confirmar)="eliminarUsuario()"
      (cancelar)="modalAbierto.set(false)"
    />
  `,
})
export class ListaUsuariosPage {
  private readonly router = inject(Router);
  private readonly usuariosService = inject(UsuariosService);

  usuarios = signal<Usuario[]>([]);
  cargando = signal(true);
  modalAbierto = signal(false);
  usuarioAEliminar = signal<number | null>(null);

  constructor() {
    this.cargarUsuarios();
  }

  private cargarUsuarios() {
    this.usuariosService.listar().subscribe({
      next: (data) => {
        this.usuarios.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  irAEditar(id: number) {
    this.router.navigate(['/usuarios', id, 'editar']);
  }

  confirmarEliminar(id: number) {
    this.usuarioAEliminar.set(id);
    this.modalAbierto.set(true);
  }

  eliminarUsuario() {
    const id = this.usuarioAEliminar();
    if (id === null) return;
    this.usuariosService.eliminar(id).subscribe({
      next: () => {
        this.modalAbierto.set(false);
        this.usuarioAEliminar.set(null);
        this.cargarUsuarios();
      },
    });
  }
}
