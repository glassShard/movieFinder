import {Person} from './person';
import {Rating} from './rating';
import {MovieImage} from './movieImage';
import {Country} from './country';

export class Movie {
  name: string;
  description: string;
  url: string;
  countryOfOrigin?: Country;
  audio: string;
  aggregateRating?: Rating;
  dateCreated: string;
  image: Array<MovieImage> ;
  contentRating: string;
  director: Array<Person>;
  actor: Array<Person>;
  subtitleLanguage: string;
  genre: Array<string>;
  provider: string;
}


