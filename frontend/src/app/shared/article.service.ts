// Libraries
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Services
import { IArticle, APIResponseModel, IImage } from '../../util/interfaces';
import { StrapiService } from '../api/strapi.service';

@Injectable({
    providedIn: 'root'
})

export class ArticleService {
    private articlesSubject = new BehaviorSubject<IArticle[]>([]);
    articles$ = this.articlesSubject.asObservable();

    private filteredArticlesSubject = new BehaviorSubject<IArticle[]>([]);
    filteredArticles$ = this.filteredArticlesSubject.asObservable();

    private selectedFilterSubject = new BehaviorSubject<string | null>('all');
    selectedFilter$ = this.selectedFilterSubject.asObservable();

    public moreArticlesSubject = new BehaviorSubject<IArticle[]>([]);
    moreArticles$ = this.moreArticlesSubject.asObservable();

    strapiUrl = 'http://localhost:1337';

    constructor(private strapiService: StrapiService) {
        this.fetchArticles();
    }

    fetchArticles(): void {
        this.strapiService.getAllArticles().subscribe((result: APIResponseModel) => {
            const articles = result.data.map((article: IArticle) => ({
                ...article,
                thumbnail_image: {
                    ...article.thumbnail_image,
                    url: this.strapiUrl + article.thumbnail_image.url || "../../../../../assets/images/img_n.a.png"
                }
            }));

            this.articlesSubject.next(articles);
            this.filteredArticlesSubject.next(articles);
        }, error => {
            console.error('Error fetching articles:', error);
        });
    }

    sortArticles(type: string): void {
        const articles = this.articlesSubject.getValue();

        if (type === 'all' || this.selectedFilterSubject.getValue() === type) {
            this.selectedFilterSubject.next('all');
            this.filteredArticlesSubject.next(articles);  // Reset to all articles
        } else {
            this.selectedFilterSubject.next(type);
            const filteredArticles = articles.filter(article => article.type === type);
            this.filteredArticlesSubject.next(filteredArticles);
        }
    }

    public selectMoreArticleByDate(currentArticleDocumentId: string): void {
        this.strapiService.getAllArticles().subscribe((result: APIResponseModel) => {
            if (result && result.data) {
                const allArticles: IArticle[] = result.data.map((article: IArticle) => ({
                    ...article,
                    thumbnail_image: {
                        ...article.thumbnail_image,
                        url: this.strapiUrl + article.thumbnail_image.url || "../../../../../assets/images/img_n.a.png"
                    }
                }));

                const filteredArticles = allArticles.filter(article => article.documentId !== currentArticleDocumentId);
                const sortedArticles = filteredArticles.sort((a, b) => {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    return dateB - dateA;
                });

                const moreArticles = sortedArticles.slice(0, 3);
                this.moreArticlesSubject.next(moreArticles);
            }
        }, error => {
            console.error('Error fetching articles:', error);
        });
    }
}