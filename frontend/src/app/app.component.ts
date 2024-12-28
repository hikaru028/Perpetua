// Libraries
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { filter } from 'rxjs/operators';
// Components
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';
import { MobileMenuComponent } from './components/menu/mobile-menu/mobile-menu.component';
import { LanguagesComponent } from './components/languages/languages-header/languages.component';
import translationsEN from "../../public/i18n/en.json";
import translationsJP from "../../public/i18n/ja.json";
import translationsKO from "../../public/i18n/ko.json";
// Services
import { LanguageService } from './shared/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LogoComponent,
    MenuComponent,
    LanguagesComponent,
    TranslateModule,
    MobileMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.translate.addLangs(['en', 'ja', 'ko']);
    this.translate.setTranslation('en', translationsEN);
    this.translate.setTranslation('ja', translationsJP);
    this.translate.setTranslation('ko', translationsKO);

    const browserLang = this.translate.getBrowserLang() || 'en';
    this.translate.setDefaultLang(browserLang);
    this.translate.use(browserLang).subscribe(() => {
      this.languageService.setCurrentLanguage(browserLang);
    });
  }

  ngOnInit(): void {
    // Meta info for SEO
    this.titleService.setTitle('Home - Perpeture');
    this.metaService.updateTag({ name: 'description', content: 'This is Perpeture website.' });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;

        // Update title and meta tag
        if (currentUrl === '/home') {
          this.titleService.setTitle('Home - Perpeture');
          this.metaService.updateTag({ name: 'description', content: 'Explore our portfolio to discover our innovative projects and learn about the diverse range of services we provide at Perpeture.' });
        } else {
          this.titleService.setTitle('Perpeture');
          this.metaService.updateTag({ name: 'description', content: 'Welcome to Perpeture, an innovative technology services company.' });
        }
      });

    this.translate.onLangChange.subscribe((event) => {
      this.languageService.setCurrentLanguage(event.lang);
    });
  }
}
