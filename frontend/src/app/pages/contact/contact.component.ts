// Libraries
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
// Components
import { LocationCardComponent } from '../about/components/location-card/location-card.component';
import { ContactData } from './contact-data';
// Services
import { StrapiService } from '../../api/strapi.service';
import { IMessage, IOffice, APIResponseModel, IFlag } from '../../../util/interfaces';
import { TranslationHelper } from '../../shared/translation-helper';
import { environment } from '../../../environments/environment';
import { OfficeService } from '../../shared/office.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    LocationCardComponent,
    FormsModule,
    ReactiveFormsModule,
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
  contactForm: FormGroup;
  formSubmitted: boolean = false;
  strapiUrl = environment.strapiMediaUrl;
  private intervalId: any;
  private timeoutId: any;
  currentLanguage: string = 'en';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private strapiService: StrapiService,
    private translationHelper: TranslationHelper,
    private officeService: OfficeService,
    private fb: FormBuilder,
  ) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
    this.offices$ = this.officeService.offices$;
    this.contactForm = this.fb.group({
      full_name: ['', Validators.required],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      country_code: ['+64'],
      phone: [''],
      message: ['', Validators.required]
    });
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
            : "../../../assets/images/no-flag.png"
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

  public sendMessage() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.formSubmitted = true;

    emailjs.send(
      'service_cvy0zb6',
      'template_x70ax2q',
      this.contactForm.value,
      { publicKey: 'W8luC9ul7Wgdj9Zdh' }
    )
      .then(
        () => {
          this.showMessage(true);
          this.contactForm.reset({
            country_code: '+64'  // Default value for country code
          });
          this.formSubmitted = false;
        },
        (error) => {
          console.error('FAILED...', (error as EmailJSResponseStatus).text);
          this.showMessage(false);
          this.formSubmitted = false;
        }
      );
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