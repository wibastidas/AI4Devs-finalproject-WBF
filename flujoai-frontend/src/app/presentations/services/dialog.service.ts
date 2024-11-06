import { ApplicationRef, ComponentRef, createComponent, Injectable, signal } from '@angular/core';
import { ConfirmDialogComponent } from '../components/ confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogComponentRef = signal<ComponentRef<ConfirmDialogComponent> | null>(null);

  constructor(private appRef: ApplicationRef) {}

  confirm(options: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    color?: 'red' | 'yellow' | 'blue';
    icon?: string;
  }): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogComponent = createComponent(ConfirmDialogComponent, {
        environmentInjector: this.appRef.injector,
      });

      // Actualizar la configuración
      dialogComponent.instance.updateConfig(options);

      // Manejar eventos
      dialogComponent.instance.confirm.subscribe(() => {
        this.removeDialog();
        resolve(true);
      });

      dialogComponent.instance.cancel.subscribe(() => {
        this.removeDialog();
        resolve(false);
      });

      // Agregar al DOM
      document.body.appendChild(dialogComponent.location.nativeElement);
      this.appRef.attachView(dialogComponent.hostView);
      this.dialogComponentRef.set(dialogComponent);
    });
  }

  private removeDialog(): void {
    if (this.dialogComponentRef()) {
      this.appRef.detachView(this.dialogComponentRef()!.hostView);
      this.dialogComponentRef()!.destroy();
      this.dialogComponentRef.set(null);
    }
  }
}
