import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../service/movie.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {
  @ViewChild('titleActorOrDirector', {static: false}) multi: ElementRef;
  @ViewChild('synopsis', {static: false}) synopsis: ElementRef;
  movies;
  category;
  flagHun = false;
  filterToActor;
  filterToDirector;
  images: string;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const category = this.route.snapshot.params.category;

    this.movieService.dataReady.subscribe(() => {
      if (category) {
        this.category = this.movieService.movieCategories.filter(item => item.urlPart === category)[0];
        this.movies = this.category.movies;
        this.images = environment.images;
      }
    });

    this.filterToActor = this.filterToString('actor');
    this.filterToDirector = this.filterToString('director');
  }

  filter() {
    let movies = this.category.movies;
    if (this.flagHun) {
      movies = this.filterToHungarian(movies);
    }

    const multiValue = this.multi.nativeElement.value;

    const filteredToMulti = [];

    if (multiValue.length > 3) {
      this.filterToTitle(movies, multiValue).map(movie => {
        if (!(filteredToMulti.includes(movie))) {
          filteredToMulti.push(movie);
        }
      });

      this.filterToActor(movies, multiValue).map(movie => {
        if (!(filteredToMulti.includes(movie))) {
          filteredToMulti.push(movie);
        }
      });

      this.filterToDirector(movies, multiValue).map(movie => {
        if (!(filteredToMulti.includes(movie))) {
          filteredToMulti.push(movie);
        }
      });
    }

    if (multiValue.length > 3) {
      movies = filteredToMulti;
    }

    const synopsisValue = this.synopsis.nativeElement.value;
    if (synopsisValue.length > 3) {
      movies = this.filterToSynopsis(movies, synopsisValue);
    }

    this.movies = movies;
  }

  hungarian() {
    this.flagHun = !this.flagHun;
    this.filter();
  }

  all() {
    this.flagHun = false;
    this.filter();
  }

  onKeyup() {
    this.filter();
  }

  filterToHungarian(movies) {
    return movies.filter(item => item.audio.includes('magyar'));
  }

  filterToString(filterTo) {
    return (movies, stringValue) => {
      return movies.filter(movie => {
        const actors = movie[filterTo].map(item => item.name.toLowerCase());
        return actors.reduce((acc, curr) => {
          if (curr.includes(stringValue.toLowerCase())) {
            acc.push(true);
          }
          return acc;
        }, []).length > 0;
      });
    };
  }

  filterToTitle(movies, titleValue) {
    return movies.filter(movie => {
      return (movie.name.toLowerCase().includes(titleValue.toLowerCase()));
    });
  }

  filterToSynopsis(movies, synopsisValue) {
    return movies.filter(movie => {
      return (movie.description.toLowerCase().includes(synopsisValue.toLowerCase()));
    });
  }
}
