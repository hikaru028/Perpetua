import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class LanguagesComponent {
  selectedLanguage: string = 'English';
  allLanguages: { code: string, label: string }[] = [
    { code: 'korean', label: '한국어' },
    { code: 'japanese', label: '日本語' },
    { code: 'english', label: 'English' }
  ];
  @Input() position: 'top' | 'bottom' = 'top';
  @ViewChild('languageForm', { static: true }) formElement!: ElementRef<HTMLFormElement>;

  get filteredLanguages() {
    return this.allLanguages.filter(lang => lang.label !== this.selectedLanguage);
  }

  onMouseEnter() {
    this.formElement.nativeElement.classList.add('visible');
  }

  onMouseLeave() {
    this.formElement.nativeElement.classList.remove('visible');
  }

  onLanguageChange(language: string) {
    this.selectedLanguage = language;
    this.onMouseLeave();
  }
}