import { Component, ElementRef, ViewChild, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LanguagesComponent {
  selectedLanguage: string = 'English';
  allLanguages: { key: string, label: string, code: string }[] = [
    { key: 'korean', label: '한국어', code: 'ko' },
    { key: 'japanese', label: '日本語', code: 'ja' },
    { key: 'english', label: 'English', code: 'en' }
  ];
  @Input() position: 'top' | 'bottom' = 'top';
  @ViewChild('languageForm', { static: true }) formElement!: ElementRef<HTMLFormElement>;
  translate: TranslateService = inject(TranslateService)

  get filteredLanguages() {
    return this.allLanguages.filter(lang => lang.label !== this.selectedLanguage);
  }

  onMouseEnter() {
    this.formElement.nativeElement.classList.add('visible');
  }

  onMouseLeave() {
    this.formElement.nativeElement.classList.remove('visible');
  }

  onLanguageChange(language: string, code: string) {
    console.log(language, code);
    this.selectedLanguage = language;
    this.translate.use(code);
    this.onMouseLeave();
  }
}