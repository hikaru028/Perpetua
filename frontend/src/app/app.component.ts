import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';
import { LanguagesComponent } from './components/languages/languages.component';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
  TranslateModule
} from "@ngx-translate/core";
import translationsEN from "../../public/i18n/en.json";
import translationsJP from "../../public/i18n/ja.json";
import translationsKO from "../../public/i18n/ko.json";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LogoComponent,
    MenuComponent,
    LanguagesComponent,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ja', 'ko']);
    this.translate.setTranslation('en', translationsEN);
    this.translate.setTranslation('ja', translationsJP);
    this.translate.setTranslation('ko', translationsKO);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || "en");
  }
}
