// Libraries
import { Component, Input, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// Services
import { IArticle } from '../../../../util/interfaces';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() articles: IArticle[] = [];
  @Input() isLoading: boolean = false;
  @ViewChildren('titleWrapper') titleWrappers!: QueryList<ElementRef>;

  constructor(private router: Router) { }

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

  onMouseEnterTitle(event: Event): void {
    const targetElement = (event.target as HTMLElement).querySelector('.title-wrapper') as HTMLElement;

    if (targetElement) {
      targetElement.classList.remove('expanded');
    }
  }

  onMouseLeaveTitle(event: Event): void {
    const targetElement = (event.target as HTMLElement).querySelector('.title-wrapper') as HTMLElement;

    if (targetElement) {
      targetElement.classList.remove('expanded');
    }
  }

  private isTextOverflowing(element: HTMLElement): boolean {
    return element.scrollHeight > element.clientHeight;
  }
}
