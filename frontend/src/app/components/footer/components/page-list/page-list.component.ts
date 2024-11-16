// Libraries
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// Services
import { LinksData } from './link-data';
import { TranslationHelper } from '../../../../shared/translation-helper';

@Component({
  selector: 'app-page-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './page-list.component.html',
  styleUrl: './page-list.component.scss'
})
export class PageListComponent implements OnInit, OnDestroy {
  links: any[] = LinksData;
  currentLanguage: string = 'en';

  constructor(private translationHelper: TranslationHelper, private translate: TranslateService) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(() => {
      this.translateLinks();
    });
    this.translateLinks(); // Initial translation setup
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
  }

  translateLinks(): void {
    this.links.forEach(link => {
      link.translatedSection = this.translate.instant(link.section);
      link.items.top.forEach((item: any) => {
        item.translatedTitle = this.translate.instant(item.title);
      });
      if (link.items.bottom) {
        link.items.bottom.forEach((item: any) => {
          item.translatedTitle = this.translate.instant(item.title);
        });
      }
    });
  }
}

