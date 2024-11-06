import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '@app/presentations/services/category.service';
import { Router } from '@angular/router';

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

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private router: Router
    ) {
        this.categoryForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            business_id: 1
        });
    }

    onSubmit() {
        if (this.categoryForm.valid) {
            this.categoryService.createCategory(this.categoryForm.value)
                .subscribe({
                    next: (response) => {
                        this.categoryForm.reset();
                        this.router.navigate(['/categories']);
                    },
                    error: (error) => {
                        console.error('Error al crear la categoría:', error);
                    }
                });
        }
    }

    onCancel(): void {
        this.router.navigate(['/categories']);
    }
}