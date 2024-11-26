// Libraries
import { Component, ElementRef, ViewChild, inject, Renderer2, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';
// Services
import { LanguageService } from '../../../shared/language.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LanguagesComponent implements OnInit, OnDestroy {
  allLanguages: { key: string, label: string, code: string }[] = [
    { key: 'korean', label: '한국어', code: 'ko' },
    { key: 'japanese', label: '日本語', code: 'ja' },
    { key: 'english', label: 'English', code: 'en' }
  ];
  isOpen: boolean = false;
  selectedLanguage: string = 'English';
  private languageSubscription: Subscription | undefined;

  @ViewChild('languageForm', { static: false }) formElement!: ElementRef<HTMLFormElement>;
  @ViewChild('currentLangWrapper', { static: false }) currentLangWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('chevronIcon', { static: false }) chevronIcon!: ElementRef<HTMLElement>;

  translate: TranslateService = inject(TranslateService);
  renderer = inject(Renderer2);
  cdr = inject(ChangeDetectorRef);
  languageService = inject(LanguageService);

  get filteredLanguages() {
    return this.allLanguages.filter(lang => lang.label !== this.selectedLanguage);
  }

  ngOnInit() {
    this.languageSubscription = this.languageService.selectedLanguage$.subscribe((language) => {
      this.selectedLanguage = language;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  toggleOption() {
    this.isOpen = !this.isOpen;
    this.updateDropdownVisibility();
  }

  updateDropdownVisibility() {
    if (this.isOpen) {
      this.onOpenOption();
    } else {
      this.onCloseOption();
    }
  }

  onLanguageChange(language: string, code: string, event: Event) {
    event.stopPropagation();
    this.languageService.updateLanguage(language); // Notify service of language change
    this.translate.use(code.trim()).subscribe(() => {
      this.onCloseOption();
      this.cdr.detectChanges();
    });
  }

  onToggleOptionKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleOption();
    }
  }

  onOpenOption() {
    if (this.formElement) {
      this.renderer.addClass(this.formElement.nativeElement, 'visible');
    }
    if (this.currentLangWrapper) {
      this.renderer.addClass(this.currentLangWrapper.nativeElement, 'visible');
    }
    if (this.chevronIcon) {
      this.renderer.addClass(this.chevronIcon.nativeElement, 'visible');
    }
  }

  onCloseOption() {
    if (this.formElement) {
      this.renderer.removeClass(this.formElement.nativeElement, 'visible');
    }
    if (this.currentLangWrapper) {
      this.renderer.removeClass(this.currentLangWrapper.nativeElement, 'visible');
    }
    if (this.chevronIcon) {
      this.renderer.removeClass(this.chevronIcon.nativeElement, 'visible');
    }
    this.isOpen = false;
  }
}



