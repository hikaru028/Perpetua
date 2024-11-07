import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { LanguagesComponent } from '../languages/languages.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, ContactInfoComponent, PageListComponent, LanguagesComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
