// Libraries
import { Component, HostListener, OnInit, ViewEncapsulation, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Components
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { MenuService } from '../../shared/menu.service';
import { ProjectService } from '../../shared/project.service';
import { IProject } from '../../../util/interfaces';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, RouterLink, TranslatePipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  encapsulation: ViewEncapsulation.None,
})

export class MenuComponent implements OnInit {
  projects$: Observable<IProject[]>;
  filteredProjects$: Observable<IProject[]>;
  projectTitles: string[] = [
    'MyOCP App',
    'Duncan Taylor Builders Website',
    'Perpetua Website',
    'OCP Group Website',
    'Ecoglo Cost-calculator',
    'First Class First Aid Website'
  ];
  selectedMenuItem: string | null = null;
  searchProjects: string = '';
  searchContent: string = '';
  @ViewChild('projectsSearchBar') projectsSearchBar!: SearchBarComponent;
  @ViewChild('articlesSearchBar') articlesSearchBar!: SearchBarComponent;
  private clickedItem: string | null = null;

  projectService: ProjectService = inject(ProjectService);

  constructor(
    private translateService: TranslateService,
    private menuService: MenuService
  ) {
    this.projects$ = this.projectService.projects$;
    this.filteredProjects$ = this.projects$.pipe(
      map((projects) =>
        this.projectTitles
          .map((title) => projects.find((project) => project.project_title === title))
          .filter((project) => !!project) as IProject[]
      )
    );
  }

  ngOnInit(): void {
    this.searchProjects = this.translateService.instant('menu.search.projects');
    this.searchContent = this.translateService.instant('menu.search.articles');

    this.translateService.onLangChange.subscribe(() => {
      this.searchProjects = this.translateService.instant('menu.search.projects');
      this.searchContent = this.translateService.instant('menu.search.articles');
    });

    this.menuService.resetMenu$.subscribe(() => {
      this.clearSelectedMenu();
    });
  }

  clearSelectedMenu() {
    const allMenuItems = document.querySelectorAll('.menu-item');
    allMenuItems.forEach(item => item.classList.remove('selected', 'active'));
    this.selectedMenuItem = null;
  }

  sortProjects(type: string): void {
    this.projectService.filterProjects(type);
  }

  onKeyDown(e: KeyboardEvent, type: string): void {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.sortProjects(type);
    }
  }

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

    const allWrappers = document.querySelectorAll('.menu-wrapper');
    allWrappers.forEach((wrapper) => wrapper.classList.remove('visible'));

    const correspondingMenuWrapper = document.getElementById(menuItem)?.parentElement;
    if (correspondingMenuWrapper) {
      correspondingMenuWrapper.classList.add('visible');
    }

    const correspondingSubmenu = document.getElementById(`submenu-${menuItem}`);
    if (correspondingSubmenu) {
      correspondingSubmenu.classList.add('visible');
    }

    // const submenus = document.querySelectorAll('.submenu-container');
    // submenus.forEach(submenu => submenu.classList.remove('visible'));

    // const menuWrappers = document.querySelectorAll('.menu-wrapper');
    // menuWrappers.forEach(wrapper => {
    //   const menuButton = wrapper.querySelector('.menu-item');
    //   const chevron = wrapper.querySelector('.chevron');
    //   if (menuButton) {
    //     menuButton.classList.remove('selected');
    //   }
    //   if (chevron) {
    //     chevron.classList.remove('visible');
    //   }
    // });

    // const correspondingSubmenu = document.getElementById(`submenu-${menuItem}`);
    // if (correspondingSubmenu) {
    //   correspondingSubmenu.classList.add('visible');

    //   const submenuBox = correspondingSubmenu.querySelector('.submenu-box');
    //   if (submenuBox) {
    //     submenuBox.classList.add('visible');
    //   }
    // }

    this.selectedMenuItem = menuItem;
  }


  onMenuHide(menuItem: string, event: Event) {
    event.stopPropagation();
    this.clickedItem = menuItem;

    const allMenuItems = document.querySelectorAll('.menu-item');
    allMenuItems.forEach(item => item.classList.remove('active'));

    const clickedMenuItem = document.getElementById(menuItem);
    if (clickedMenuItem) {
      clickedMenuItem.classList.add('active');
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

    setTimeout(() => {
      this.clickedItem = null;
    }, 200);

    this.selectedMenuItem = null;
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (
      !targetElement.closest('.menu-container') &&
      !targetElement.closest('.submenu-container')
    ) {
      // Remove the `visible` class from all menu wrappers and chevrons
      const allWrappers = document.querySelectorAll('.menu-wrapper');
      allWrappers.forEach((wrapper) => {
        wrapper.classList.remove('visible'); // Ensure the menu wrapper itself is reset
        const menuButton = wrapper.querySelector('.menu-item');
        const chevron = wrapper.querySelector('.chevron');
        if (menuButton) {
          menuButton.classList.remove('selected');
        }
        if (chevron) {
          chevron.classList.remove('visible'); // Explicitly handle the chevron visibility
        }
      });

      // Remove the `visible` class from all submenus
      const submenus = document.querySelectorAll('.submenu-container');
      submenus.forEach((submenu) => submenu.classList.remove('visible'));

      // Reset the selected menu item
      this.selectedMenuItem = null;
    } else {
      // Debugging logs to identify which element is causing the issue
      console.log('Mouse is inside menu-container or submenu-container');
    }
  }
}