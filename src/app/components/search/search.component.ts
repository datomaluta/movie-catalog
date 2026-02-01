import { Component, inject, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';
import { MovieType } from '../../models/movie.model';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class Search {
  private movieService = inject(MovieService);

  searchString = '';
  private search$ = new Subject<string>();

  suggestions = signal<MovieType[]>([])

  constructor() {
    this.search$
      .pipe(
        debounceTime(400), // wait user to stop typing
        distinctUntilChanged(), // ignore same value
        filter((text) => text.length >= 3),
        switchMap((text) => this.movieService.getMovies(text, 1)),
      )
      .subscribe((data) => {
        console.log(data);
        this.suggestions.set(data.Search ?? []);
      });
  }

  liveSuggestion(value: string) {
    this.search$.next(value);
  }
}
