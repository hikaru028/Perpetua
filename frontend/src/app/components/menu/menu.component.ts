// Libraries
import { Component, HostListener, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
// Components
import { SearchBarComponent } from "./search-bar/search-bar.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SearchBarComponent, RouterLink, TranslatePipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  encapsulation: ViewEncapsulation.None,
})

export class MenuComponent implements OnInit, AfterViewInit {
  selectedMenuItem: string | null = null;
  searchProjects: string = '';
  searchContent: string = '';
  @ViewChild('projectsSearchBar') projectsSearchBar!: SearchBarComponent;
  @ViewChild('articlesSearchBar') articlesSearchBar!: SearchBarComponent;
  private clickedItem: string | null = null;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.searchProjects = this.translateService.instant('menu.search.projects');
    this.searchContent = this.translateService.instant('menu.search.articles');

    this.translateService.onLangChange.subscribe(() => {
      this.searchProjects = this.translateService.instant('menu.search.projects');
      this.searchContent = this.translateService.instant('menu.search.articles');
    });
  }

  ngAfterViewInit(): void {

  }


  // hideSubmenu(): void {
  //   this.projectsSearchBar.hideSubmenu();
  //   this.articlesSearchBar.hideSubmenu();
  // }

  onMenuHover(menuItem: string, event: Event) {
    event.stopPropagation();

    if (this.projectsSearchBar) {
      this.projectsSearchBar.removeBottomBorder();
    }
    if (this.articlesSearchBar) {
      this.articlesSearchBar.removeBottomBorder();
    }

    if (this.clickedItem === menuItem) {
      return;
    }

    const submenus = document.querySelectorAll('.submenu-container');
    submenus.forEach(submenu => submenu.classList.remove('visible'));

    const menuWrappers = document.querySelectorAll('.menu-wrapper');
    menuWrappers.forEach(wrapper => {
      const menuButton = wrapper.querySelector('.menu-item');
      const chevron = wrapper.querySelector('.chevron');
      if (menuButton) {
        menuButton.classList.remove('selected');
      }
      if (chevron) {
        chevron.classList.remove('visible');
      }
    });

    const correspondingSubmenu = document.getElementById(`submenu-${menuItem}`);
    if (correspondingSubmenu) {
      correspondingSubmenu.classList.add('visible');

      const submenuBox = correspondingSubmenu.querySelector('.submenu-box');
      if (submenuBox) {
        submenuBox.classList.add('visible');
      }
    }

    const clickedMenuItem = document.getElementById(menuItem);
    if (clickedMenuItem) {
      clickedMenuItem.classList.add('selected');
      const menuWrapper = clickedMenuItem.closest('.menu-wrapper');
      if (menuWrapper) {
        const chevron = menuWrapper.querySelector('.chevron');
        if (chevron) {
          chevron.classList.add('visible');
        }
      }
    }

    this.selectedMenuItem = menuItem;
  }


  onMenuHide(menuItem: string, event: Event) {
    event.stopPropagation();
    this.clickedItem = menuItem;

    const submenus = document.querySelectorAll('.submenu-container');
    submenus.forEach(submenu => submenu.classList.remove('visible'));

    const menuWrappers = document.querySelectorAll('.menu-wrapper');
    menuWrappers.forEach(wrapper => {
      const menuButton = wrapper.querySelector('.menu-item');
      const chevron = wrapper.querySelector('.chevron');
      if (menuButton) {
        menuButton.classList.remove('selected');
      }
      if (chevron) {
        chevron.classList.remove('visible');
      }
    });

    setTimeout(() => {
      this.clickedItem = null;
    }, 200);

    this.selectedMenuItem = null;
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('.menu-container') && !targetElement.closest('.submenu-container')) {
      const submenus = document.querySelectorAll('.submenu-container');
      submenus.forEach(submenu => submenu.classList.remove('visible'));

      const menuWrappers = document.querySelectorAll('.menu-wrapper');
      menuWrappers.forEach(wrapper => {
        const menuButton = wrapper.querySelector('.menu-item');
        const chevron = wrapper.querySelector('.chevron');
        if (menuButton) {
          menuButton.classList.remove('selected');
        }
        if (chevron) {
          chevron.classList.remove('visible');
        }
      });

      this.selectedMenuItem = null;
    }
  }
}