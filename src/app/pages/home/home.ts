import { Component, signal, effect, OnInit } from '@angular/core';
import { SeriesService, Serie } from '../../services/series.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  series = signal<Serie[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private seriesService: SeriesService) {
    effect(() => {
      console.log('Series actualizado:', this.series());
    });
  }

  ngOnInit(): void {
    this.loadSeries();
  }

  loadSeries(): void {
    this.loading.set(true);
    this.error.set(null);
    this.seriesService.getSeries().subscribe({
      next: (data) => {
        this.series.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar series:', err);
        this.error.set('Error al cargar las series');
        this.loading.set(false);
      },
    });
  }

  trackByTitle(index: number, serie: Serie): string {
    return serie.title;
  }
}
