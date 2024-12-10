// Libraries
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// Components
import { BackToTopButtonComponent } from '../../../components/buttons/back-to-top-button/back-to-top-button.component';
import { ArticleContentComponent } from './components/article-content/article-content.component';
import { MoreArticlesComponent } from './components/more-articles/more-articles.component';
import { ArticleDetailSkeletonComponent } from '../../../components/skeletons/article-detail-skeleton/article-detail-skeleton.component';
// Services
import { StrapiService } from '../../../api/strapi.service';
import { IArticle, APIResponseModel } from '../../../../util/interfaces';
import { TranslationHelper } from '../../../shared/translation-helper';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [
    CommonModule,
    BackToTopButtonComponent,
    ArticleContentComponent,
    MoreArticlesComponent,
    ArticleDetailSkeletonComponent,
    TranslateModule
  ],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  documentId!: string;
  article?: IArticle;
  currentLanguage: string = 'en';
  strapiUrl = environment.strapiMediaUrl;

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private strapiService: StrapiService,
    private translationHelper: TranslationHelper
  ) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.documentId = id;
        this.loadArticleDetails();
      }
    });
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
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
    this.router.navigate(['/articles']);
  }
}
