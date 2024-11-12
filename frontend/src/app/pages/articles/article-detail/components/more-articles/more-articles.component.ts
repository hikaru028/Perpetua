// Libraries
import { Component, inject, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { ArticleCardComponent } from '../../../../../components/article-card/article-card.component';
// Services
import { ArticleService } from '../../../../../shared/article.service';
import { IProject } from '../../../../../../util/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-more-articles',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent],
  templateUrl: './more-articles.component.html',
  styleUrl: './more-articles.component.scss'
})
export class MoreArticlesComponent implements OnChanges {
  @Input() currentArticleDocumentId: string | null = null;
  moreArticles$: Observable<IProject[]>;
  articleService: ArticleService = inject(ArticleService);


  constructor() {
    this.moreArticles$ = this.articleService.moreArticles$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentArticleDocumentId'] && changes['currentArticleDocumentId'].currentValue) {
      this.articleService.selectMoreProjectByDate(changes['currentArticleDocumentId'].currentValue);
    }
  }
}
