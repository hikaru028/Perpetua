// Libraries
import { Component, Input, OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
// Components
import { ShareArticleButtonComponent } from '../../../../../components/buttons/share-article-button/share-article-button.component';
// Services
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
  sanitizedContent: SafeHtml | undefined;
  restOfContent: SafeHtml | undefined;
  firstLetter: string = '';

  constructor(private sanitizer: DomSanitizer, private elRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['article'] && this.article?.content) {
      this.parseContent();
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

    const moreArticlesElement = this.elRef.nativeElement.querySelector('.more-articles-container') as HTMLElement;
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
}
