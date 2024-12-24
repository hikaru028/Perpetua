// Libraries
import { Component, HostListener, OnInit, ViewEncapsulation, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
// Components
import { LanguageFooterComponent } from '../../languages/language-footer/language-footer.component';
// Services
import { MenuService } from '../../../shared/menu.service';
import { ProjectService } from '../../../shared/project.service';
import { ArticleService } from '../../../shared/article.service';
import { IProject } from '../../../../util/interfaces';
import { TranslationHelper } from '../../../shared/translation-helper';


@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, LanguageFooterComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})

export class MobileMenuComponent implements OnInit {
  isMenuOpen = false;
  currentLanguage: string = 'en';

  selectedMenuItem: string | null = null;
  searchProjects: string = '';
  searchContent: string = '';
  private clickedItem: string | null = null;

  projectService: ProjectService = inject(ProjectService);
  articleService: ArticleService = inject(ArticleService);

  constructor(
    private translationHelper: TranslationHelper,
    private menuService: MenuService,
    private router: Router
  ) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnInit(): void {

  }

  clearSelectedMenu() {
    const allMenuItems = document.querySelectorAll('.menu-item');
    allMenuItems.forEach(item => item.classList.remove('selected', 'active'));
    this.selectedMenuItem = null;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
