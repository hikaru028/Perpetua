// Libraries
import { Component, Input, OnInit, inject, ViewChild, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// Components
import { IProject, IArticle, APIResponseModel } from '../../../../util/interfaces';
// Services
import { StrapiService } from '../../../api/strapi.service';

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
  @ViewChild('searchInput') searchInput!: ElementRef;
  searchControl = new FormControl();
  projects: IProject[] = [];
  articles: IArticle[] = [];
  searchResultAll: string[] = [];
  searchResults: { title: string, path: string, highlightedTitle: SafeHtml }[] = [];
  strapiService = inject(StrapiService);
  sanitizer = inject(DomSanitizer);

  constructor(private renderer: Renderer2) { }

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

  onSearchIconKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onSearchInput();
    }
  }

  onSearchInput(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }

    const keyword = this.searchControl.value?.toLowerCase() || '';

    if (this.searchInput) {
      const border = this.searchInput.nativeElement.nextElementSibling;
      this.renderer.addClass(border, 'visible');
    }

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

  // hideSubmenu(): void {
  //   const submenus = document.querySelectorAll('.submenu-container');
  //   submenus.forEach(submenu => submenu.classList.remove('visible'));
  // }

  removeBottomBorder(): void {
    if (this.searchInput) {
      const border = this.searchInput.nativeElement.nextElementSibling;
      if (border) {
        this.renderer.removeClass(border, 'visible');
      }
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('.search-bar-container')) {
      const border = this.searchInput.nativeElement.nextElementSibling;
      if (border) {
        border.classList.remove('visible');
      }
      this.searchResults = [];
      if (this.searchInput) {
        this.searchInput.nativeElement.blur();
      }
    }
  }
}