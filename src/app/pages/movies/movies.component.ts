import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { MovieType } from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const page = Number(params['page']) || 1;
      this.currentPage.set(page);
      this.loadMovies();
    });
  }

  loadMovies() {
    this.loading.set(true);
    this.movieService.getMovies('new', this.currentPage()).subscribe({
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
    window.scrollTo({ behavior: 'smooth', top: 0 });
    this.updatePage(this.currentPage() + 1);
  }

  previousPage() {
    if (this.currentPage() === 1) return;
    window.scrollTo({ behavior: 'smooth', top: 0 });
    this.updatePage(this.currentPage() - 1);
  }

  private updatePage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  dummyMovies = Array.from({ length: 10 });
}
