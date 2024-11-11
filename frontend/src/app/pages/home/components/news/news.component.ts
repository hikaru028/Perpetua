// Libraries
import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
// Components
import { ArticleCardComponent } from '../../../../components/article-card/article-card.component';
// Services
import { IArticle } from '../../../../../util/interfaces';
import { ArticleService } from '../../../../shared/article.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterLink, ArticleCardComponent, TranslateModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})

export class NewsComponent implements OnInit {
  articles$: Observable<IArticle[]>;
  selectedFilter$: Observable<string | null>;

  articleService = inject(ArticleService);
  translate: TranslateService = inject(TranslateService);
  currentLanguage: string = 'en';


  constructor() {
    this.articles$ = this.articleService.filteredArticles$;
    this.selectedFilter$ = this.articleService.selectedFilter$;
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
    });
  }

  sortArticles(type: string): void {
    this.articleService.sortArticles(type);
  }
}
