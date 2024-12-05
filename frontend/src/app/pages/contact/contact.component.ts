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
import { IClient, IOffice, APIResponseModel, IFlag } from '../../../util/interfaces';
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
  flags: IFlag[] = [];
  selectedFlagUrl: string | null = '';
  selectedCountryName: string = 'New Zealand';
  strapiUrl = environment.strapiMediaUrl;
  private intervalId: any;
  private timeoutId: any;
  private fullName = '';
  private company = '';
  private email = '';
  private countryCode = ''
  private phone = '';
  private message = '';
  currentLanguage: string = 'en';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private strapiService: StrapiService,
    private translationHelper: TranslationHelper,
    private officeService: OfficeService,
  ) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
    this.offices$ = this.officeService.offices$;
  }

  ngOnInit(): void {
    // Meta info for SEO
    this.titleService.setTitle('Contact - Perpeture');
    this.metaService.updateTag({ name: 'description', content: 'Browse Contact to get in touch with us at Perpeture.' });

    this.selectedLocation = 'Christchurch';
    this.selectedContactInfo = this.contactData.find(data => data.location === 'Christchurch');

    this.strapiService.getAllFlags().subscribe((response: APIResponseModel) => {
      this.flags = response.data.map((flag: IFlag) => ({
        ...flag,
        flag_image: {
          ...flag.flag_image,
          url: flag.flag_image && flag.flag_image.url
            ? this.strapiUrl + flag.flag_image.url
            : "../../../assets/images/no-flag.png" // Fallback if the URL is missing
        }
      }));
      this.setDefaultFlag('+64');
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

  setDefaultFlag(defaultCode: string): void {
    console.log("defaultCode:", defaultCode);
    const matchingFlag = this.flags.find(flag => flag.country_code === defaultCode);
    console.log(matchingFlag)
    if (matchingFlag) {
      this.selectedFlagUrl = matchingFlag.flag_image.url;
      this.selectedCountryName = matchingFlag.country;
    } else {
      this.selectedFlagUrl = '../../../assets/images/no-flag.png';
      this.selectedCountryName = 'New Zealand';
    }
  }

  onCountryCodeInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputCode = inputElement.value.trim();

    if (!inputCode.startsWith('+')) {
      inputCode = '+' + inputCode;
      inputElement.value = inputCode;
    }

    const matchingFlag = this.flags.find(flag => flag.country_code === inputCode);

    if (matchingFlag) {
      this.selectedFlagUrl = matchingFlag.flag_image.url;
      this.selectedCountryName = matchingFlag.country;
    } else {
      this.selectedFlagUrl = '../../../assets/images/no-flag.png';
      this.selectedCountryName = 'New Zealand';
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

  autoResize(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    if (textarea.value.trim() === '') {
      textarea.style.height = '38px';
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`;
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

  verifyAndSendFormEmail(): void {
    const confirmation = window.confirm('Are you sure you want to send this message?');
    if (confirmation) {
      this.sendFormEmail();
    }
  }

  sendFormEmail(): void {
    try {
      this.fullName = (document.getElementById('full-name') as HTMLInputElement).value;
      this.company = (document.getElementById('company') as HTMLInputElement).value;
      this.email = (document.getElementById('email') as HTMLInputElement).value;
      this.countryCode = (document.getElementById('country-code') as HTMLInputElement).value;
      this.phone = (document.getElementById('phone') as HTMLInputElement).value;
      this.message = (document.getElementById('message') as HTMLTextAreaElement).value;

      const emailBody = `
        Full Name: ${this.fullName}
        Company: ${this.company}
        Email: ${this.email}
        Country Code: ${this.countryCode}
        Phone: ${this.phone}
        Message:
        ${this.message}
      `;

      const mailtoLink = `mailto:h.suzuki.028@gmail.com?subject=Message from Perpeture website&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;

      this.showMessage(true);

      (document.getElementById('full-name') as HTMLInputElement).value = '';
      (document.getElementById('company') as HTMLInputElement).value = '';
      (document.getElementById('email') as HTMLInputElement).value = '';
      (document.getElementById('country-code') as HTMLInputElement).value = '+64';
      (document.getElementById('phone') as HTMLInputElement).value = '';
      (document.getElementById('message') as HTMLTextAreaElement).value = '';
    } catch (error) {
      this.showMessage(false);
    }
  }

  showMessage(success: boolean): void {
    const successMessage = document.querySelector('.success-msg') as HTMLElement;
    const errorMessage = document.querySelector('.error-msg') as HTMLElement;

    if (success) {
      successMessage.classList.add('visible');
    } else {
      errorMessage.classList.add('visible');
    }

    setTimeout(() => {
      if (success) {
        successMessage.classList.remove('visible');
      } else {
        errorMessage.classList.remove('visible');
      }
    }, 5000);
  }
}
