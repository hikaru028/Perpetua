import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { SearchBarComponent } from "./search-bar/search-bar.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {
  selectedMenuItem: string | null = null;

  onMenuClick(menuItem: string, event: Event) {
    event.stopPropagation();

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('selected'));

    // Hide all submenus
    const submenus = document.querySelectorAll('.submenu-container');
    submenus.forEach(submenu => submenu.classList.remove('visible'));

    // Add "selected" class to the clicked item
    const clickedMenuItem = document.getElementById(menuItem);
    if (clickedMenuItem) {
      clickedMenuItem.classList.add('selected');
    }

    // Show the corresponding submenu
    const correspondingSubmenu = document.getElementById(`submenu-${menuItem}`);
    if (correspondingSubmenu) {
      correspondingSubmenu.classList.add('visible');
    }

    // Update the selected menu item
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

      // Also deselect all menu items
      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach(item => item.classList.remove('selected'));

      // Reset the selectedMenuItem state
      this.selectedMenuItem = null;
    }
  }
}
