import { Component } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-movies',
  imports: [MovieCard],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {}
