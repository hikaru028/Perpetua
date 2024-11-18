// Libraries
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  constructor(private sanitizer: DomSanitizer) { }

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
        this.firstLetter = textContent.charAt(0);

        const updatedHTML = tempElement.innerHTML.replace(
          textContent.charAt(0),
          ''
        );

        const contentWithoutFirstLetter = textContent.slice(1); // Removing the first letter
        const words = contentWithoutFirstLetter.trim().split(/\s+/);

        if (words.length > 1) {
          const firstTwoWordsUpperCase = words.slice(0, 2).join(' ').toUpperCase();
          const restOfWords = words.slice(2).join(' ');

          const modifiedTextContent = `${this.firstLetter}${firstTwoWordsUpperCase} ${restOfWords}`;
          tempElement.textContent = modifiedTextContent;

          // Style images in the content
          const styledContent = updatedHTML.replace(
            /<img /g,
            '<img style="width: 100%; height: auto; max-width: 100%;" '
          );

          this.restOfContent = this.sanitizer.bypassSecurityTrustHtml(styledContent);
        }
      }
    }
  }
}
