import { Routes } from '@angular/router';
import { Movies } from './pages/movies/movies';
import { MovieDetails } from './pages/movie-details/movie-details';

export const routes: Routes = [
  {
    path: '',
    component: Movies,
  },
  {
    path: ':id',
    component: MovieDetails,
  },
];
