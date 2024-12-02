// Libraries
import { Component, Input, inject, OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { marked } from 'marked';
import { Observable } from 'rxjs';
// Components
import { ShareArticleButtonComponent } from '../../../../../components/buttons/share-article-button/share-article-button.component';
// Services
import { ArticleService } from '../../../../../shared/article.service';
import { IArticle } from '../../../../../../util/interfaces';

@Component({
  selector: 'app-article-content',
  standalone: true,
  imports: [CommonModule, ShareArticleButtonComponent],
  templateUrl: './article-content.component.html',
  styleUrl: './article-content.component.scss'
})
export class ArticleContentComponent implements OnChanges {
  @Input() article: IArticle | undefined;
  @Input() currentArticleDocumentId: string | null = null;
  moreArticles$: Observable<IArticle[]>;
  sanitizedContent: SafeHtml | undefined;
  restOfContent: SafeHtml | undefined;
  firstLetter: string = '';
  articleService: ArticleService = inject(ArticleService);

  constructor(private sanitizer: DomSanitizer, private router: Router, private elRef: ElementRef) {
    this.moreArticles$ = this.articleService.moreArticles$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['article'] && this.article?.content) {
      this.parseContent();
    }

    if (changes['currentArticleDocumentId'] && changes['currentArticleDocumentId'].currentValue) {
      this.articleService.selectMoreArticleByDate(changes['currentArticleDocumentId'].currentValue);
    }
  }

  parseContent(): void {
    const parsedContent = marked.parse(this.article?.content);
    if (typeof parsedContent === 'string') {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = parsedContent;

      const textContent = tempElement.textContent || '';
      if (textContent.length > 0) {
        this.firstLetter = textContent.charAt(0).toUpperCase();

        let restText = textContent.slice(1).trim();
        const words = restText.split(/\s+/);
        if (words.length >= 2) {
          words[0] = words[0].toUpperCase();
          words[1] = words[1].toUpperCase();
        }
        restText = `${words.join(' ')} *`;

        tempElement.textContent = restText;

        const styledContent = tempElement.innerHTML.replace(
          /<img /g,
          '<img style="width: 100%; height: auto; max-width: 100%;" '
        );

        this.restOfContent = this.sanitizer.bypassSecurityTrustHtml(styledContent);
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;

    const moreArticlesElement = this.elRef.nativeElement.querySelector('.related-articles-container') as HTMLElement;
    const contentLeftElement = this.elRef.nativeElement.querySelector('.content-left') as HTMLElement;

    if (moreArticlesElement && contentLeftElement) {
      const contentLeftRect = contentLeftElement.getBoundingClientRect();
      const moreArticlesRect = moreArticlesElement.getBoundingClientRect();

      const maxTranslateY = contentLeftRect.height - moreArticlesRect.height;

      if (scrollPosition > 400) {
        let parallaxValue = (scrollPosition - 400) * 0.9;
        parallaxValue = Math.min(parallaxValue, maxTranslateY);

        moreArticlesElement.style.transform = `translateY(${parallaxValue}px)`;
      } else {
        moreArticlesElement.style.transform = `translateY(0)`;
      }
    }
  }

  backToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }

  navigateToArticle(documentId: string): void {
    this.backToTop();
    this.router.navigate(['/articles', documentId]);
  }

  handleKeydown(event: KeyboardEvent, documentId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.navigateToArticle(documentId);
    }
  }
}
