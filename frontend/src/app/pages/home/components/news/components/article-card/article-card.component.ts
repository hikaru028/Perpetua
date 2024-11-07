import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IArticle } from '../../../../../../../util/interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() articles: IArticle[] = [];
}
