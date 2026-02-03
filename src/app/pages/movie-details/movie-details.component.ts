import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { MovieDetailsType, MovieType } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetails {
  movieData = signal<MovieDetailsType | null>(null);
  loading = signal(false);
  error = signal('');
  id = input.required<string>();
  private movieService = inject(MovieService);

  // ngOnInit(): void {
  //   this.loadMovieData();
  // }

  constructor() {
    effect(() => {
      const movieId = this.id();

      this.loading.set(true);
      this.error.set('');
      this.movieData.set(null);

      this.movieService.getMoviesById(movieId).subscribe({
        next: (data) => {
          this.movieData.set(data);
        },
        error: () => {
          this.error.set('Something went wrong');
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    });
  }

  loadMovieData() {
    this.loading.set(true);
    this.movieService.getMoviesById(this.id()).subscribe({
      next: (data) => {
        this.movieData.set(data);
      },
      error: () => {
        this.error.set('Something went wrong');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
