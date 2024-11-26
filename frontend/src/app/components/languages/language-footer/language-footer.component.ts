import { Component, ElementRef, ViewChild, inject, Renderer2, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-language-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-footer.component.html',
  styleUrls: ['./language-footer.component.scss']
})
export class LanguageFooterComponent {
  isOpen: boolean = false;
  selectedLanguage: string = 'English';
  allLanguages: { key: string, label: string, code: string }[] = [
    { key: 'korean', label: '한국어', code: 'ko' },
    { key: 'japanese', label: '日本語', code: 'ja' },
    { key: 'english', label: 'English', code: 'en' }
  ];

  @ViewChild('languageForm', { static: false }) formElement!: ElementRef<HTMLFormElement>;
  @ViewChild('currentLangWrapper', { static: false }) currentLangWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('chevronIcon', { static: false }) chevronIcon!: ElementRef<HTMLElement>;

  translate: TranslateService = inject(TranslateService);
  renderer = inject(Renderer2);
  cdr = inject(ChangeDetectorRef);

  get filteredLanguages() {
    return this.allLanguages.filter(lang => lang.label !== this.selectedLanguage);
  }

  toggleOption() {
    this.isOpen = !this.isOpen;
    this.cdr.detectChanges();
    if (this.isOpen) {
      this.onOpenOption();
    } else {
      this.onCloseOption();
    }
  }

  onToggleOptionKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleOption();
    }
  }

  langOption(lang: string) {
    this.isOpen = !this.isOpen;
    this.cdr.detectChanges();
    this.selectedLanguage = lang;
    if (this.isOpen) {
      this.onOpenOption();
    } else {
      this.onCloseOption();
    }
  }

  onLangOptionKeyDown(event: KeyboardEvent, lang: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.langOption(lang);
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
