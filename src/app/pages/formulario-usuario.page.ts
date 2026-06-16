import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../interfaces/usuario.interface';
import { FormularioUsuarioComponent } from '../components/formulario-usuario.component';

@Component({
  selector: 'app-formulario-usuario-page',
  imports: [FormularioUsuarioComponent],
  template: `
    <div class="mx-auto max-w-lg px-4 py-10">
      <h1 class="mb-8 text-2xl font-bold text-gray-900">
        {{ usuario() ? 'Editar usuario' : 'Nuevo usuario' }}
      </h1>

      <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <app-formulario-usuario
          [usuario]="usuario()"
          (guardar)="onGuardar($event)"
          (cancelar)="volver()"
        />
      </div>
    </div>
  `,
})
export class FormularioUsuarioPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly usuariosService = inject(UsuariosService);

  usuario = signal<Usuario | null>(null);
  private esEdicion = false;
  private usuarioId?: number;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.usuarioId = +id;
      this.cargarUsuario(this.usuarioId);
    }
  }

  private cargarUsuario(id: number) {
    this.usuariosService.obtenerPorId(id).subscribe({
      next: (usuario) => this.usuario.set(usuario),
    });
  }

  onGuardar(datos: { nombre: string; email: string }) {
    const obs = this.esEdicion && this.usuarioId
      ? this.usuariosService.actualizar(this.usuarioId, datos)
      : this.usuariosService.crear(datos);

    obs.subscribe({
      next: () => this.router.navigate(['/usuarios']),
    });
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }
}
