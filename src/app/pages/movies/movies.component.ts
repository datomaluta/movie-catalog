import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { MovieType } from '../../models/movie.model';

@Component({
  selector: 'app-movies',
  imports: [MovieCard],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class Movies implements OnInit {
  movies = signal<MovieType[]>([]);
  loading = signal(false);
  error = signal('');
  currentPage = signal(1);

  private movieService = inject(MovieService);

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.loading.set(true);
    this.movieService.getMovies('mar', this.currentPage()).subscribe({
      next: (data) => {
        this.movies.set(data.Search ?? []);

        if (data.Response === 'False') this.error.set(data.Error);
      },
      error: (err) => {
        console.log(err);
        this.error.set(err.message);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  nextPage() {
    this.currentPage.set(this.currentPage() + 1);
    this.loadMovies();
  }

  previousPage() {
    this.currentPage.set(this.currentPage() - 1);
    this.loadMovies();
  }
}
