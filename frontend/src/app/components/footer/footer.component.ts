// Libraries
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// Components
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { LanguagesComponent } from '../languages/languages.component';
// Services
import { TranslationHelper } from '../../shared/translation-helper';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ContactInfoComponent,
    PageListComponent,
    LanguagesComponent,
    TranslateModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnDestroy {
  currentLanguage: string = 'en';

  constructor(private translationHelper: TranslationHelper) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
  }
}
