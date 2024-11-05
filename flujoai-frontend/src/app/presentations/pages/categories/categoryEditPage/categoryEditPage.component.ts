import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@app/core/models/category.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category-edit-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './categoryEditPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryEditPageComponent implements OnInit {
    categoryForm: FormGroup;
    categoryId: number = 0;
    category?: Category;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            type: ['expense']
        });

        const navigation = this.router.getCurrentNavigation();
        this.category = navigation?.extras?.state?.['category'] as Category;
    }

    ngOnInit(): void {
        if (this.category) {
            this.categoryId = this.category.id;
            this.categoryForm.patchValue({
                name: this.category.name,
                description: this.category.description,
                type: this.category.type
            });
            console.log('Formulario actualizado:', this.categoryForm.value);
        } else {
            this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
        }
    }

    onSubmit() {
        if (this.categoryForm.valid) {
            const updatedCategory = {
                id: this.categoryId,
                ...this.categoryForm.value
            };
            console.log('Categoría actualizada:', updatedCategory);
            // Aquí iría la lógica para actualizar la categoría
        }
    }
}
