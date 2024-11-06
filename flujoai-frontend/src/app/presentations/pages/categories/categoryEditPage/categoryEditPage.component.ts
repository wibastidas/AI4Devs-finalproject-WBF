import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@app/interfaces/category.interface';
import { CategoryService } from '@app/presentations/services/category.service';

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
export class CategoryEditPageComponent {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private categoryService = inject(CategoryService);

    public category = signal<Category | null>(null);
    public isLoading = signal(true);
    public error = signal<string | null>(null);
    public isSaving = signal(false);

    public categoryForm: FormGroup = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        business_id: 1
    });

    constructor() {
        const navigation = this.router.getCurrentNavigation();
        const categoryFromState = navigation?.extras?.state?.['category'] as Category;

        if (categoryFromState) {
            this.initializeForm(categoryFromState);
        } else {
            const categoryId = this.route.snapshot.paramMap.get('id');
            if (categoryId) this.loadCategory(categoryId);
        }
    }

    private initializeForm(category: Category): void {
        this.category.set(category);
        this.categoryForm.patchValue({
            name: category.name,
            description: category.description,
        });
        this.isLoading.set(false);
    }

    private loadCategory(id: string): void {
        this.categoryService.getCategoryById(id).subscribe({
            next: (response) => {
                if (response.ok && 'id' in response) {
                    const { id, name, description, business_id, created_at, updated_at } = response;
                    this.category.set({ id, name, description, business_id, created_at, updated_at });
                    this.initializeForm(response);
                } else {
                    this.error.set(response.error || 'Error al cargar la categoría');
                }
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error al obtener la categoría:', error);
                this.error.set('Error al cargar la categoría');
                this.isLoading.set(false);
            }
        });
    }

    onSubmit(): void {
        if (this.categoryForm.valid) {
            const categoryId = this.route.snapshot.params['id'];
            this.categoryService.updateCategory(categoryId, this.categoryForm.value)
                .subscribe({
                    next: (response) => {
                        console.log('Categoría actualizada exitosamente:', response);
                        this.router.navigate(['/categories']);
                    },
                    error: (error) => {
                        console.error('Error al actualizar la categoría:', error);
                    }
                });
        }
    }
}
