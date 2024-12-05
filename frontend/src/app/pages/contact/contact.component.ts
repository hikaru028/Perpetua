// Libraries
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
// Components
import { LocationCardComponent } from '../about/components/location-card/location-card.component';
import { ContactData } from './contact-data';
// Services
import { StrapiService } from '../../api/strapi.service';
import { IClient, IMember, IOffice, ICareer, APIResponseModel } from '../../../util/interfaces';
import { TranslationHelper } from '../../shared/translation-helper';
import { environment } from '../../../environments/environment';
import { CareerService } from '../../shared/career.service';
import { OfficeService } from '../../shared/office.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    LocationCardComponent,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  offices$: Observable<IOffice[]>;
  contactData = ContactData;
  selectedLocation: string | null = 'christchurch';
  selectedContactInfo: any = null;
  strapiUrl = environment.strapiMediaUrl;
  private intervalId: any;
  private timeoutId: any;
  currentLanguage: string = 'en';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private strapiService: StrapiService,
    private route: ActivatedRoute,
    private translationHelper: TranslationHelper,
    private careerService: CareerService,
    private officeService: OfficeService,
  ) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
    this.offices$ = this.officeService.offices$;
  }

  ngOnInit(): void {
    this.selectedLocation = 'Christchurch';
    this.selectedContactInfo = this.contactData.find(data => data.location === 'Christchurch');

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToSection(fragment);
      }
    });
  }

  ngOnDestroy(): void {
    this.translationHelper.unsubscribe();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onLocationClick(location: string): void {
    this.selectedLocation = location;
    this.selectedContactInfo = this.contactData.find(data => data.location.toLowerCase() === location.toLowerCase()) || null;
  }

  onLocationKeydown(event: KeyboardEvent, location: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onLocationClick(location);
    }
  }

  sendEmail(email: string): void {
    if (email) {
      const mailtoLink = `mailto:${email}`;
      window.location.href = mailtoLink;
    }
  }

  sendEmailKeyDown(event: KeyboardEvent, email: string): void {
    if ((event.key === 'Enter' || event.key === ' ') && email) {
      event.preventDefault();
      this.sendEmail(email);
    }
  }
}
