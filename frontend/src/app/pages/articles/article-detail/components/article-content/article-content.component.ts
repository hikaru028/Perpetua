// Libraries
import { Component, Input, inject, OnChanges, SimpleChanges, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
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

  async parseContent(): Promise<void> {
    if (!this.article?.content) {
      return;
    }

    try {
      const parsedContent = await marked.parse(this.article.content);

      // Create a temporary element to manipulate the HTML
      const tempElement = document.createElement('div');
      tempElement.innerHTML = parsedContent;

      // Extract and manipulate text content while preserving HTML structure
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

        // Replace the text content back into the HTML structure
        const nodes = tempElement.childNodes;
        let currentIndex = 0;

        const processNodes = (node: Node): void => {
          if (node.nodeType === Node.TEXT_NODE) {
            if (currentIndex === 0) {
              node.textContent = restText;
              currentIndex++;
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.childNodes.forEach(childNode => processNodes(childNode));
          }
        };

        tempElement.childNodes.forEach(processNodes.bind(this));

        const styledContent = tempElement.innerHTML.replace(
          /<img\s+([^>]*?)>/g,
          '<img style="width: 100%; height: auto; max-width: 100%;" $1>'
        );

        this.restOfContent = this.sanitizer.bypassSecurityTrustHtml(styledContent);
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error parsing content:', error);
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

      if (scrollPosition > 550) {
        let parallaxValue = (scrollPosition - 550) * 1.0;
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
