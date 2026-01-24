import { Component, input } from '@angular/core';
import { MovieType } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCard {
  data = input.required<MovieType>();

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/no-image.jpg';
  }
}
