import { Component, input, output, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-formulario-usuario',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-5">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input
          [(ngModel)]="nombre"
          name="nombre"
          required
          placeholder="Nombre completo"
          class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          [(ngModel)]="email"
          name="email"
          type="email"
          required
          placeholder="correo@ejemplo.com"
          class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />
      </div>
      <div class="flex gap-3 pt-2">
        <button
          type="submit"
          class="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          {{ usuario() ? 'Actualizar' : 'Crear' }}
        </button>
        <button
          type="button"
          (click)="cancelar.emit()"
          class="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  `,
})
export class FormularioUsuarioComponent {
  usuario = input<Usuario | null>(null);
  guardar = output<{ nombre: string; email: string }>();
  cancelar = output<void>();

  nombre = '';
  email = '';

  constructor() {
    effect(() => {
      const u = this.usuario();
      if (u) {
        this.nombre = u.nombre;
        this.email = u.email;
      } else {
        this.nombre = '';
        this.email = '';
      }
    });
  }

  onSubmit() {
    if (!this.nombre || !this.email) return;
    this.guardar.emit({ nombre: this.nombre, email: this.email });
  }
}
