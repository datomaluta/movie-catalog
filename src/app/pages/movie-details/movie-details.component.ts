import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MovieDetailsType, MovieType } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetails implements OnInit {
  movieData = signal<MovieDetailsType | null>(null);
  loading = signal(false);
  error = signal('');
  id = input.required<string>();
  private movieService = inject(MovieService);

  ngOnInit(): void {
    this.loadMovieData();
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
