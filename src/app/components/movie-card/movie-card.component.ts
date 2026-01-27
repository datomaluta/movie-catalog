import { Component, inject, input } from '@angular/core';
import { MovieType } from '../../models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCard {
  data = input.required<MovieType>();
  private router = inject(Router);

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/no-image.jpg';
  }

  goToDetails(id: string) {
    this.router.navigate([id]);
  }
}
