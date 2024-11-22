// Libraries
import { Component, inject, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
// Components
import { ArticleCardComponent } from '../../../../../components/article-cards/article-card/article-card.component';
// Services
import { ArticleService } from '../../../../../shared/article.service';
import { IArticle } from '../../../../../../util/interfaces';
import { TranslationHelper } from '../../../../../shared/translation-helper';

@Component({
  selector: 'app-more-articles',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent, TranslateModule],
  templateUrl: './more-articles.component.html',
  styleUrl: './more-articles.component.scss'
})
export class MoreArticlesComponent implements OnChanges, OnDestroy {
  @Input() currentArticleDocumentId: string | null = null;
  moreArticles$: Observable<IArticle[]>;
  articleService: ArticleService = inject(ArticleService);
  currentLanguage: string = 'en';

  constructor(private translationHelper: TranslationHelper) {
    this.moreArticles$ = this.articleService.moreArticles$;
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentArticleDocumentId'] && changes['currentArticleDocumentId'].currentValue) {
      this.articleService.selectMoreArticleByDate(changes['currentArticleDocumentId'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
  }

}
