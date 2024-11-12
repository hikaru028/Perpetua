// Libraries
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
// Components
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { CallActionComponent } from '../../components/call-action/call-action.component';
import { BackToTopButtonComponent } from '../../components/buttons/back-to-top-button/back-to-top-button.component';
// Service
import { IArticle } from '../../../util/interfaces';
import { ArticleService } from '../../shared/article.service';


@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ArticleCardComponent,
    CallActionComponent,
    BackToTopButtonComponent,
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  articles$: Observable<IArticle[]>;
  selectedFilter$: Observable<string | null>;

  // Lazy loading
  visibleArticles: IArticle[] = [];
  private allArticles: IArticle[] = [];
  articlesToLoad: number = 6;
  loadMoreButtonVisible: boolean = false;

  articleService = inject(ArticleService);
  translate: TranslateService = inject(TranslateService);
  currentLanguage: string = 'en';

  constructor(private titleService: Title, private metaService: Meta) {
    this.articles$ = this.articleService.filteredArticles$;
    this.selectedFilter$ = this.articleService.selectedFilter$;
  }

  ngOnInit(): void {
    // Meta info for SEO
    this.titleService.setTitle('Articles - Perpeture');
    this.metaService.updateTag({ name: 'description', content: 'Browse our news/blogs to read more about the amazing things we have done at Perpeture.' });

    this.selectedFilter$.subscribe((filter) => {
      if (filter) {
        const upperCaseFilter = filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase(); // capitalise only the first letter
        this.titleService.setTitle(`${upperCaseFilter} in Articles - Perpeture`);
        this.metaService.updateTag({ name: 'description', content: `Browse ${filter} articles by Perpeture` });
      } else {
        this.titleService.setTitle('All articles - Perpeture');
        this.metaService.updateTag({ name: 'description', content: 'Browse all articles by Perpeture' });
      }
    });

    this.articles$.subscribe((articles) => {
      this.allArticles = articles;
      this.initializeVisibleArticles();
    });

    this.translate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
      this.titleService.setTitle(this.translate.instant('projects.title') + ' - Perpeture');
    });
  }

  initializeVisibleArticles(): void {
    this.visibleArticles = this.allArticles.slice(0, this.articlesToLoad);
    this.loadMoreButtonVisible = this.visibleArticles.length < this.allArticles.length;
  }

  loadMoreArticles(): void {
    const newArticles = this.allArticles.slice(this.visibleArticles.length, this.visibleArticles.length + this.articlesToLoad);
    this.visibleArticles = [...this.visibleArticles, ...newArticles];
    this.loadMoreButtonVisible = this.visibleArticles.length < this.allArticles.length;
  }

  sortProjects(type: string): void {
    this.articleService.sortArticles(type);
  }
}
