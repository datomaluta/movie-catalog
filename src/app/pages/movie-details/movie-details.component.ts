import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MovieType } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetails implements OnInit {
  movieData = signal<MovieType | null>(null);
  id = input.required<string>();
  private movieService = inject(MovieService);

  ngOnInit(): void {
    this.loadMovieData();
  }

  loadMovieData() {
    this.movieService.getMoviesById(this.id()).subscribe({
      next: (data) => {
        console.log(data);
        // this.movieData.set()
      },
    });
  }
}
