// Libraries
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// Components
import { CallActionComponent } from '../../components/call-action/call-action.component';
import { BackToTopButtonComponent } from '../../components/buttons/back-to-top-button/back-to-top-button.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
// Services
import { TranslationHelper } from '../../shared/translation-helper';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule, CallActionComponent, BackToTopButtonComponent, ServiceCardComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})

export class ServicesComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'en';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translationHelper: TranslationHelper,
    private translate: TranslateService
  ) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnInit() {
    // Meta info for SEO
    this.titleService.setTitle('What we do - Perpeture');
    this.metaService.updateTag({ name: 'description', content: 'Browse Services to learn more about our ultimate services at Perpeture.' });
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
  }
}
