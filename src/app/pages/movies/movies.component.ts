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

  private movieService = inject(MovieService);

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies('marvel').subscribe({
      next: (data) => {
        this.movies.set(data.Search ?? []);
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
