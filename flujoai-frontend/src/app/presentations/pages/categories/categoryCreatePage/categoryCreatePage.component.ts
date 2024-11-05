import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-category-create-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './categoryCreatePage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCreatePageComponent {
    categoryForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
        });
    }

    onSubmit() {
        if (this.categoryForm.valid) {
            const { name, description } = this.categoryForm.value;
            console.log('Nombre:', name, 'Descripción:', description);
            // Aquí puedes manejar la lógica para crear la categoría
        }
    }
}