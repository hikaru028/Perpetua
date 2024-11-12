// Libraries
import { Component, Input, OnInit } from '@angular/core';
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
export class ArticleContentComponent implements OnInit {
  @Input() article: IArticle | undefined;
  sanitizedContent: SafeHtml | undefined;
  firstLetter: string = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const parsedContent = marked.parse(this.article?.content);
    if (typeof parsedContent === 'string') {
      // Extract the first letter and rest of the content
      const firstChar = parsedContent.charAt(3);
      const restOfContent = parsedContent.slice(1);

      // Set the first letter for drop-cap
      this.firstLetter = firstChar;

      // Update the rest of the content while sanitizing
      const styledContent = restOfContent.replace(
        /<img /g,
        '<img style="width: 100%; height: auto; max-width: 100%;" '
      );
      this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(styledContent);
    }
  }
}
