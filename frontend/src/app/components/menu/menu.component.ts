// Libraries
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
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

export class MenuComponent implements OnInit {
  selectedMenuItem: string | null = null;
  searchProjects: string = '';
  searchContent: string = '';

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.searchProjects = this.translateService.instant('menu.search.projects');
    this.searchContent = this.translateService.instant('menu.search.articles');

    this.translateService.onLangChange.subscribe(() => {
      this.searchProjects = this.translateService.instant('menu.search.projects');
      this.searchContent = this.translateService.instant('menu.search.articles');
    });
  }

  onMenuClick(menuItem: string, event: Event) {
    event.stopPropagation();

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


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    const isMenuClick = targetElement.closest('.menu-container') || targetElement.closest('.submenu-container');

    if (!isMenuClick) {
      const submenus = document.querySelectorAll('.submenu-container');
      submenus.forEach(submenu => submenu.classList.remove('visible'));

      const menuWrappers = document.querySelectorAll('.menu-wrapper');
      menuWrappers.forEach(wrapper => {
        const menuButton = wrapper.querySelector('.menu-item');
        const chevron = wrapper.querySelector('.chevron');
        const submenuBox = wrapper.querySelector('.submenu-box');
        if (submenuBox) {
          submenuBox.classList.add('visible');
        }
        if (menuButton) {
          menuButton.classList.remove('selected');
          if (chevron) {
            chevron.classList.remove('visible');
          }
          if (submenuBox) {
            submenuBox.classList.remove('visible');
          }
        }
      });

      this.selectedMenuItem = null;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    const isMenuHover = targetElement.closest('.menu-container');
    const isSubmenuHover = targetElement.closest('.submenu-container');

    if (!isMenuHover && !isSubmenuHover) {
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