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

    public moreProjectsSubject = new BehaviorSubject<IArticle[]>([]);
    moreProjects$ = this.moreProjectsSubject.asObservable();

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
                },
                media: article.media?.map((mediaItem: IImage) => ({
                    ...mediaItem,
                    url: this.strapiUrl + mediaItem.url || "../../../../../assets/images/img_n.a.png"
                })) || null
            }));

            this.articlesSubject.next(articles);
            this.filteredArticlesSubject.next(articles);
        }, error => {
            console.error('Error fetching articles:', error);
        });
    }

    sortArticles(type: string): void {
        console.log("Selected type: ", type);

        const articles = this.articlesSubject.getValue(); // Always start with the full list

        if (type === 'all' || this.selectedFilterSubject.getValue() === type) {
            // Show all articles
            this.selectedFilterSubject.next('all');
            this.filteredArticlesSubject.next(articles);  // Reset to all articles
            console.log("Articles (all): ", articles);
        } else {
            // Filter articles based on the selected type
            this.selectedFilterSubject.next(type);
            const filteredArticles = articles.filter(article => article.type === type);
            this.filteredArticlesSubject.next(filteredArticles);
            console.log("Articles by type: ", filteredArticles);
        }
    }

    public selectMoreArticleByDate(currentArticleDocumentId: string): void {
        this.strapiService.getAllProjects().subscribe((result: APIResponseModel) => {
            if (result && result.data) {
                const allProjects: IArticle[] = result.data.map((project: IArticle) => ({
                    ...project,
                    thumbnail_image: {
                        ...project.thumbnail_image,
                        url: this.strapiUrl + project.thumbnail_image.url || "../../../../../assets/images/img_n.a.png"
                    }
                }));

                const filteredProjects = allProjects.filter(project => project.documentId !== currentArticleDocumentId);
                const sortedProjects = filteredProjects.sort((a, b) => {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    return dateB - dateA;
                });

                const moreProjects = sortedProjects.slice(0, 3);
                this.moreProjectsSubject.next(moreProjects);
            }
        }, error => {
            console.error('Error fetching projects:', error);
        });
    }
}