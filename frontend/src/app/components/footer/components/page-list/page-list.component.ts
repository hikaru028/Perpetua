import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServiceData } from './link-data';

@Component({
  selector: 'app-page-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './page-list.component.html',
  styleUrl: './page-list.component.scss'
})
export class PageListComponent {
  links: any[] = ServiceData;
}
