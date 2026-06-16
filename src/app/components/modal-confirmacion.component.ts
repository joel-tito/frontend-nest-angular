import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacion',
  template: `
    @if (abierto()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
          <h3 class="text-lg font-semibold text-gray-900">Confirmar eliminación</h3>
          <p class="mt-2 text-sm text-gray-600">{{ mensaje() }}</p>
          <div class="mt-6 flex justify-end gap-3">
            <button
              (click)="cancelar.emit()"
              class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              (click)="confirmar.emit()"
              class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ModalConfirmacionComponent {
  abierto = input(false);
  mensaje = input('¿Estás seguro de eliminar este usuario?');
  confirmar = output<void>();
  cancelar = output<void>();
}
