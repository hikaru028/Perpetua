import { Component, ViewEncapsulation } from '@angular/core';
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
}
