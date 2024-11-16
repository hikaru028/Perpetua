// Libraries
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { TranslateModule } from '@ngx-translate/core';
// Services
import { IArticle } from '../../../util/interfaces';
import { TranslationHelper } from '../../shared/translation-helper';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe, TranslateModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent implements OnDestroy {
  @Input() articles: IArticle[] = [];
  @Input() fromArticlePage: boolean = false;
  currentLanguage: string = 'en';

  constructor(private router: Router, private translationHelper: TranslationHelper) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onKeyDown(event: KeyboardEvent, documentId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.navigateToArticle(documentId);
    }
  }

  navigateToArticle(documentId: string): void {
    this.scrollToTop();
    this.router.navigate(['/articles', documentId]);
  }
}
