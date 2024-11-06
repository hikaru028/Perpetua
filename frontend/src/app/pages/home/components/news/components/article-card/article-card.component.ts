import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IArticle } from '../../../../../../../util/interfaces';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() articles: IArticle[] = [];
}
