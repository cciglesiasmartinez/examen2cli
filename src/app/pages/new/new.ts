import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule],
  templateUrl: './new.html',
  styleUrl: './new.css',
})
export class New {
  serieForm!: FormGroup;
  submitted = false;
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private seriesService: SeriesService,
    private router: Router
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.serieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      channel: ['', [Validators.required, Validators.minLength(2)]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.message = null;

    if (this.serieForm.invalid) {
      return;
    }

    this.loading = true;
    const payload = this.serieForm.value;

    this.seriesService.create(payload).subscribe({
      next: (response) => {
        this.messageType = 'success';
        this.message = `¡Serie creada! ID: ${response.id}`;
        this.loading = false;
      
      },
      error: (error) => {
        this.messageType = 'error';
        this.message = 'Error al crear la serie. Intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  getFieldError(fieldName: string): string | null {
    const field = this.serieForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} es requerido`;
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['min']) {
        return `El valor mínimo es ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `El valor máximo es ${field.errors['max'].max}`;
      }
    }
    return null;
  }
}
