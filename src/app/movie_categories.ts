import {Movie} from './model/movie';

export class MovieCategory {
  name: string;
  urlPart: string;
  movies: Array<Movie>;
}

export const movieCategories = [
  { name: 'Animáció', urlPart: 'animacio' },
  { name: 'Kaland', urlPart: 'kaland' },
  { name: 'Akció', urlPart: 'akcio' },
  { name: 'Képregény', urlPart: 'kepregeny' },
  { name: 'Western', urlPart: 'western' },
  { name: 'Dráma', urlPart: 'drama' },
  { name: 'Vígjáték', urlPart: 'vigjatek' },
  { name: 'Thriller', urlPart: 'thriller' },
  { name: 'Fantasy', urlPart: 'fantasy' },
  { name: 'Életrajz', urlPart: 'eletrajz' },
  { name: 'Horror', urlPart: 'horror' },
  { name: 'Krimi', urlPart: 'krimi' },
  { name: 'Összes', urlPart: 'osszes' },
  { name: 'HBO GO', urlPart: 'hbo' },
  { name: 'Netflix', urlPart: 'netflix' },
  { name: 'Egyéb', urlPart: 'egyeb' }
];



