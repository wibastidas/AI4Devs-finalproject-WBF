import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';

interface DialogConfig {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  color: 'red' | 'yellow' | 'blue';
  icon: string;
}

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  dialogConfig = signal<DialogConfig>({
    title: '¿Estás seguro?',
    message: '¿Deseas continuar con esta acción?',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    color: 'red',
    icon: 'fas fa-exclamation-triangle'
  });

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  updateConfig(config: Partial<DialogConfig>) {
    this.dialogConfig.update(current => ({ ...current, ...config }));
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  protected onClickOutside(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('dialog-overlay')) {
      this.onCancel();
    }
  }
}