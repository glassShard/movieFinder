import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../model/movie';
import {Update} from '../model/update';
import {forkJoin, Observable, ReplaySubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {movieCategories} from '../movie_categories';
import {MovieCategory} from '../model/movieCategory';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies: Array<Movie>;
  hbo: Array<Movie>;
  netflix: Array<Movie>;
  update: Update = new Update();
  movieCategories: Array<MovieCategory>;
  dataReady = new ReplaySubject(1);

  constructor(private http: HttpClient) {
    this.loadMovies().subscribe(() => {
      // this.logUniqueGenres();
      this.sortMovies();
      this.filterMovies();
      this.dataReady.next(true);
    });
  }

  filterMovies() {
    this.movieCategories = movieCategories.map(item => {
      let movies;
      const notGenres = ['Összes', 'HBO GO', 'Netflix', 'Egyéb'];
      if (item.name === 'Összes') {
        movies = {movies: this.movies};
      } else if (item.name === 'HBO GO') {
        movies = {movies: this.hbo};
      } else if (item.name === 'Netflix') {
        movies = {movies: this.netflix};
      } else if (item.name === 'Egyéb') {
        const genres = [];
        movieCategories.map(category => {
          if (!(notGenres.includes(category.name))) {
            genres.push(category.name);
          }
          const other = this.movies.filter(movieItem => {
            const clearedGenre = movieItem.genre.map(gen => gen.trim().toLowerCase());
            const result = clearedGenre.reduce((acc, curr) => {
              if (genres.filter(g => curr === g).length === 0) {
                acc++;
              }
              return acc;
            }, 0);
            return result === 0;
          });
          movies = {movies: other};
        });
      } else {
        movies = {movies: this.filterGenre(item.name)};
      }

      return Object.assign(new MovieCategory(), item, movies);
    });
  }

  logUniqueGenres() {
    const genres = [];
    this.movies.map(item => {
      const genre = item.genre;
      genre.map(genitem => {
        let converted;
        if (genitem.includes(', ')) {
          converted = genitem.split(', ');
        } else {
          converted = [genitem];
        }
        converted.map(convertedItem => {
          if (!genres.includes(convertedItem)) {
            genres.push(convertedItem);
          }
        });
      });
    });
    console.log(genres);
  }

  private loadMovies(): Observable<Array<any>> {
    return forkJoin([
      this.loadHbo(),
      this.loadNetflix()
    ]).pipe(
      tap(data => {
        this.update.hbo = data[0].date;
        this.update.netflix = data[1].date;
        this.hbo = data[0].movies;
        this.netflix = data[1].movies;
        this.movies = this.hbo.concat(this.netflix);
      }));
  }

  private loadHbo(): Observable<any> {
    return this.http.get(environment.hboLink);
  }

  private loadNetflix(): Observable<any> {
    return this.http.get(environment.netflixLink);
  }

  private sortMovies() {
    this.movies.sort((a, b) => {
      if (parseInt(a.dateCreated, 10) < parseInt(b.dateCreated, 10)) {
        return 1;
      }
      if (parseInt(a.dateCreated, 10) > parseInt(b.dateCreated, 10)) {
        return -1;
      }
    });
  }

  private filterGenre(category): Array<Movie> {
    return this.movies.filter(movie => {
      const clearedGenre = movie.genre.map(item => item.trim().toLowerCase());
      const booleanArr = clearedGenre.map(item => {
        return item.includes(category.toLowerCase());
      });
      return booleanArr.includes(true);
    });
  }
}
