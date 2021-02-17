import {Component, OnInit} from '@angular/core';
import {MovieCategory} from '../movie_categories';
import {Router} from '@angular/router';
import {MovieService} from '../service/movie.service';
import {Update} from '../model/update';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Array<MovieCategory>;
  date: Update;

  constructor(private router: Router,
              private movieService: MovieService) {
  }

  ngOnInit() {
    this.movieService.dataReady.subscribe(() => {
      this.categories = this.movieService.movieCategories;
      this.date = this.movieService.update;
    });
  }

  clickCategory(event, category) {
    this.router.navigate(['/show-movie-list', category.urlPart]).then();
  }
}
