import { Routes } from '@angular/router';
import { Movies } from './pages/movies/movies.component';
import { MovieDetails } from './pages/movie-details/movie-details.component';

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
