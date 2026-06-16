import { Component, input, output } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tabla-usuarios',
  imports: [DatePipe],
  template: `
    <div class="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left font-semibold text-gray-600">ID</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-600">Nombre</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-600">Email</th>
            <th class="px-6 py-3 text-left font-semibold text-gray-600">Creado</th>
            <th class="px-6 py-3 text-right font-semibold text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          @for (usuario of usuarios(); track usuario.id) {
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-gray-500">{{ usuario.id }}</td>
              <td class="px-6 py-4 font-medium text-gray-900">{{ usuario.nombre }}</td>
              <td class="px-6 py-4 text-gray-600">{{ usuario.email }}</td>
              <td class="px-6 py-4 text-gray-500">{{ usuario.createdAt | date:'dd/MM/yyyy' }}</td>
              <td class="px-6 py-4 text-right space-x-2">
                <button
                  (click)="editar.emit(usuario.id)"
                  class="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Editar
                </button>
                <button
                  (click)="eliminar.emit(usuario.id)"
                  class="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                No hay usuarios registrados
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class TablaUsuariosComponent {
  usuarios = input.required<Usuario[]>();
  editar = output<number>();
  eliminar = output<number>();
}
