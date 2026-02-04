import { Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subject, switchMap } from 'rxjs';
import { MovieType } from '../../models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class Search {
  private movieService = inject(MovieService);
  private router = inject(Router);

  searchString = '';
  private search$ = new Subject<string>();
  loading = signal(false);
  hasSearched = signal(false);

  suggestions = signal<MovieType[]>([]);
  hasShowMore = signal(false);

  constructor() {
    this.search$
      .pipe(
        debounceTime(400), // wait user to stop typing
        // distinctUntilChanged(), // ignore same value
        switchMap((text) => {
          if (text.length < 3) {
            this.suggestions.set([]);
            this.hasSearched.set(false);
            this.hasShowMore.set(false);
            return [];
          }

          this.loading.set(true);
          this.hasSearched.set(true);
          return this.movieService.getMovies(text, 1);
        }),
      )
      .subscribe((data) => {
        this.suggestions.set(data.Search ?? []);
        console.log(data.totalResults);
        if (data.totalResults > 10) this.hasShowMore.set(true);
        this.loading.set(false);
      });
  }

  liveSuggestion(value: string) {
    this.search$.next(value);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/no-image.jpg';
  }

  goToDetails(id: string) {
    this.router.navigate(['/', id]).then(() => {
      this.searchString = '';
      this.suggestions.set([]);
    });
  }

  @ViewChild('searchBox') searchBox!: ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickInside = this.searchBox.nativeElement.contains(event.target as Node);

    if (!clickInside) {
      this.closeSuggestions();
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeSuggestions();
  }

  closeSuggestions() {
    this.searchString = '';
    this.suggestions.set([]);
    this.hasShowMore.set(false);
  }

  showMore() {
    this.router.navigate(['/'], {
      queryParams: {
        search: this.searchString,
        page: 1,
      },
    });
    this.closeSuggestions();
  }
}
