import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IArticle, APIResponseModel, IImage } from '../../../../../util/interfaces';
import { StrapiService } from '../../../../api/strapi.service';
import { ArticleCardComponent } from './components/article-card/article-card.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterLink, ArticleCardComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})

export class NewsComponent implements OnInit {
  articles: IArticle[] = [];
  filteredArticles: IArticle[] = [];
  selectedFilter: string | null = null;
  strapiService = inject(StrapiService);
  strapiUrl = 'http://localhost:1337';

  ngOnInit(): void {
    this.strapiService.getAllArticles().subscribe((result: APIResponseModel) => {
      this.articles = result.data;

      this.articles = this.articles.map(article => ({
        ...article,
        // Update thumbnail_image URL
        thumbnail_image: {
          ...article.thumbnail_image,
          url: this.strapiUrl + article.thumbnail_image.url || "../../../../../assets/images/img_n.a.png"
        },
        // Update URLs for media array if it exists
        media: article.media?.map((mediaItem: IImage) => ({
          ...mediaItem,
          url: this.strapiUrl + mediaItem.url || "../../../../../assets/images/img_n.a.png"
        })) || null
      }));

      this.filteredArticles = [...this.articles];
    }, error => {
      console.error('Error fetching articles:', error);
    });
  }

  sortArticles(type: string): void {
    if (this.selectedFilter === type) {
      this.selectedFilter = null;
      this.filteredArticles = this.articles;
    } else {
      this.selectedFilter = type;

      this.filteredArticles = this.articles.filter(article => {
        const articleType = article.type?.toLowerCase().trim();
        const selectedType = type.toLowerCase().trim();
        return articleType === selectedType;
      });
    }
  }
}
