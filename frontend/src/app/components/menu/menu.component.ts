import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateDirective } from "@ngx-translate/core";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SearchBarComponent, RouterLink, TranslatePipe, TranslateDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  encapsulation: ViewEncapsulation.None,
})

export class MenuComponent {
  selectedMenuItem: string | null = null;

  onMenuClick(menuItem: string, event: Event) {
    event.stopPropagation();

    // Hide all submenus
    const submenus = document.querySelectorAll('.submenu-container');
    submenus.forEach(submenu => submenu.classList.remove('visible'));

    // Deselect previously selected items
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

    // Show the corresponding submenu
    const correspondingSubmenu = document.getElementById(`submenu-${menuItem}`);
    if (correspondingSubmenu) {
      correspondingSubmenu.classList.add('visible');

      const submenuBox = correspondingSubmenu.querySelector('.submenu-box');
      if (submenuBox) {
        submenuBox.classList.add('visible');
      }
    }

    // Add "selected" class to the clicked item
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

    // Update the selected menu item state
    this.selectedMenuItem = menuItem;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Check if the click happened inside the menu container or submenu container
    const isMenuClick = targetElement.closest('.menu-container') || targetElement.closest('.submenu-container');

    if (!isMenuClick) {
      // Click happened outside of the menu/submenu; hide all submenus
      const submenus = document.querySelectorAll('.submenu-container');
      submenus.forEach(submenu => submenu.classList.remove('visible'));

      // Deselect all menu items (removing the "selected" state)
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

      // Reset the selectedMenuItem state
      this.selectedMenuItem = null;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Check if the hover is on the menu container or submenu container
    const isMenuHover = targetElement.closest('.menu-container');
    const isSubmenuHover = targetElement.closest('.submenu-container');

    // Only hide submenus if the hover is not on the menu container and not on the submenu container
    if (!isMenuHover && !isSubmenuHover) {
      // Mouse is outside of the menu/submenu; hide all submenus
      const submenus = document.querySelectorAll('.submenu-container');
      submenus.forEach(submenu => submenu.classList.remove('visible'));

      // Deselect all menu items (removing the "selected" state)
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

      // Reset the selectedMenuItem state
      this.selectedMenuItem = null;
    }
  }
}