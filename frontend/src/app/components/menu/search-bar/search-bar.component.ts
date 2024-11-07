import { Component, ElementRef, ViewChild, Input, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProject, IArticle, APIResponseModel } from '../../../../util/interfaces';
import { RouterLink } from '@angular/router';
import { StrapiService } from '../../../api/strapi.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() data: 'projects' | 'articles' = 'projects';
  searchControl = new FormControl();
  projects: IProject[] = [];
  articles: IArticle[] = [];
  strapiService = inject(StrapiService);
  strapiUrl = 'http://localhost:1337';
  searchResultAll: string[] = [];
  searchResults: { title: string, path: string, highlightedTitle: SafeHtml }[] = [];
  sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    if (this.data === 'projects') {
      this.strapiService.getAllProjects().subscribe((result: APIResponseModel) => {
        this.projects = result.data;
      }, error => {
        console.error('Error fetching projects:', error);
      });
    } else if (this.data === 'articles') {
      this.strapiService.getAllArticles().subscribe((result: APIResponseModel) => {
        this.articles = result.data;
      }, error => {
        console.error('Error fetching articles:', error);
      });
    }
  }

  onSearchInput(): void {
    const keyword = this.searchControl.value?.toLowerCase() || '';

    if (!keyword) {
      this.searchResults = [];
      this.searchResultAll = [];
      return;
    }

    if (this.data === 'projects') {
      this.searchResults = this.projects
        .filter((project: IProject) => project.project_title.toLowerCase().includes(keyword))
        .slice(0, 5)
        .map((project: IProject) => ({
          title: project.project_title,
          path: `/projects/${project.documentId}`,
          highlightedTitle: this.getHighlightedText(project.project_title, keyword)
        }));
      this.searchResultAll = this.projects.filter((project: IProject) => project.project_title.toLowerCase().includes(keyword)).map((project: IProject) => (`/projects/${project.documentId}`));
    } else if (this.data === 'articles') {
      this.searchResults = this.articles
        .filter((article: IArticle) => article.title.toLowerCase().includes(keyword))
        .slice(0, 5)
        .map((article: IArticle) => ({
          title: article.title,
          path: `/articles/${article.documentId}`,
          highlightedTitle: this.getHighlightedText(article.title, keyword)
        }));
      this.searchResultAll = this.articles.filter((article: IArticle) => article.title.toLowerCase().includes(keyword)).map((article: IArticle) => (`/articles/${article.documentId}`));
    }
  }

  getHighlightedText(text: string, keyword: string): SafeHtml {
    if (!keyword) {
      return text;
    }

    const regex = new RegExp(`(${keyword})`, 'gi');
    const newText = text.replace(regex, `<span style="font-weight: 500; color: #ffffff;">$1</span>`);
    return this.sanitizer.bypassSecurityTrustHtml(newText);
  }
}