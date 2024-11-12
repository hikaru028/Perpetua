// Libraries
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
// Components
import { CallActionComponent } from '../../../components/call-action/call-action.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { BackToTopButtonComponent } from '../../../components/buttons/back-to-top-button/back-to-top-button.component';
import { ArticleContentComponent } from './components/article-content/article-content.component';
import { MoreArticlesComponent } from './components/more-articles/more-articles.component';
import { ArticleDetailSkeletonComponent } from '../../../components/skeletons/article-detail-skeleton/article-detail-skeleton.component';
// Services
import { StrapiService } from '../../../api/strapi.service';
import { IArticle, APIResponseModel } from '../../../../util/interfaces';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [
    CommonModule,
    // RouterLink,
    CallActionComponent,
    FooterComponent,
    BackToTopButtonComponent,
    ArticleContentComponent,
    MoreArticlesComponent,
    ArticleDetailSkeletonComponent
  ],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent implements OnInit {
  documentId!: string;
  article?: IArticle;
  strapiUrl = 'http://localhost:1337';

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private strapiService: StrapiService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.documentId = id;
        this.loadArticleDetails();
      }
    });
  }

  loadArticleDetails(): void {
    this.strapiService.getArticleById(this.documentId).subscribe((result: APIResponseModel) => {
      if (result && result.data) {
        this.article = {
          ...result.data,
          thumbnail_image: {
            ...result.data.thumbnail_image,
            url: this.strapiUrl + result.data.thumbnail_image.url || "../../../../../assets/images/img_n.a.png"
          },
        };

        if (this.article) {
          this.titleService.setTitle(`${this.article.type}: ${this.article.title} (${this.article.createdAt}) - Perpeture`);
          this.metaService.updateTag({
            name: 'description',
            content: `Read more about ${this.article.title}.`
          });
        }
      }
    },
      (error) => {
        console.error('Error fetching article:', error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
