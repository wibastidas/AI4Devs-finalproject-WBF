import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@app/interfaces/category.interface';

import { CategoryService } from '@app/presentations/services/category.service';

@Component({
    selector: 'app-category-detail-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './categoryDetailPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDetailPageComponent {
    private route = inject(ActivatedRoute);
    private categoryService = inject(CategoryService);

    public category = signal<Category | null>(null);
    public isLoading = signal(true);
    public error = signal<string | null>(null);

    constructor() {
        this.loadCategory();
    }

    private loadCategory() {
        console.log('Iniciando carga de detalle de categoría...');
        
        const categoryId = this.route.snapshot.paramMap.get('id');
        
        if (!categoryId) {
            console.error('No se encontró ID en la URL');
            this.error.set('ID de categoría no proporcionado');
            this.isLoading.set(false);
            return;
        }

        console.log('Obteniendo categoría con ID:', categoryId);
        
        this.categoryService.getCategoryById(categoryId)
            .subscribe({
                next: (response) => {
                    if (response.ok && response.category) {
                        const { id, name, description, business_id, created_at, updated_at } = response.category;
                        this.category.set({
                            id,
                            name,
                            description,
                            business_id,
                            created_at,
                            updated_at,
                        });
                        this.error.set(null);
                    } else {
                        console.error('Error en la respuesta:', response.error);
                        this.error.set(response.error || 'Error al cargar la categoría');
                        this.category.set(null);
                    }
                    this.isLoading.set(false);
                },
                error: (error) => {
                    console.error('Error al obtener la categoría:', error);
                    this.error.set('Error al cargar la categoría');
                    this.category.set(null);
                    this.isLoading.set(false);
                },
                complete: () => {
                    console.log('Proceso de obtención de categoría completado');
                }
            });
    }
}
