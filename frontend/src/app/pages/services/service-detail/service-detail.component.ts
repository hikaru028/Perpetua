// Libraries
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// Components
import { CallActionComponent } from '../../../components/call-action/call-action.component';
import { BackToTopButtonComponent } from '../../../components/buttons/back-to-top-button/back-to-top-button.component';
import { ServiceCardComponent } from '../components/service-card/service-card.component';
// Services
import { TranslationHelper } from '../../../shared/translation-helper';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule, CallActionComponent, BackToTopButtonComponent, ServiceCardComponent],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})

export class ServiceDetailComponent implements OnInit, OnDestroy {
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
    this.titleService.setTitle('What we do - Perpetua');
    this.metaService.updateTag({ name: 'description', content: 'Browse Services to learn more about our ultimate services at Perpetua.' });
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
  }
}
