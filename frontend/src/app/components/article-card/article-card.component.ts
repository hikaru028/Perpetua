// Libraries
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TruncatePipe } from '../../pipes/truncate.pipe';
// Services
import { IArticle } from '../../../util/interfaces';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() articles: IArticle[] = [];
  @Input() fromArticlePage: boolean = false;

  constructor(private router: Router) { }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  navigateToArticle(documentId: string): void {
    this.scrollToTop();
    this.router.navigate(['/articles', documentId]);
  }

  onKeyDown(event: KeyboardEvent, documentId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.navigateToArticle(documentId);
    }
  }
}
