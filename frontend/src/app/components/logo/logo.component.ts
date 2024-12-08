import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../shared/menu.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  constructor(private menuService: MenuService) { }

  onLogoClick() {
    this.menuService.resetMenu();
  }

  onKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    this.onLogoClick();
  }
}