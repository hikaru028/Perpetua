// Libraries
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// Components
import { ProjectCardComponent } from '../../../components/project-card/project-card.component';
import { CareerCardComponent } from '../components/career-card/career-card.component';
// Services
import { StrapiService } from '../../../api/strapi.service';
import { IOffice, ICareer, APIResponseModel } from '../../../../util/interfaces';
import { TranslationHelper } from '../../../shared/translation-helper';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-office-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, ProjectCardComponent, CareerCardComponent],
  templateUrl: './office-detail.component.html',
  styleUrl: './office-detail.component.scss'
})
export class OfficeDetailComponent implements OnInit, OnDestroy {
  documentId!: string;
  office?: IOffice;
  offices: IOffice[] = [];
  careers: ICareer[] = [];
  memberNames: string[] = [];
  formattedTime: { hours: string, minutes: string, period: string } | null = null;
  strapiUrl = environment.strapiMediaUrl;
  private intervalId: any;
  private timeoutId: any;
  currentLanguage: string = 'en';

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private location: Location,
    private strapiService: StrapiService,
    private activatedRoute: ActivatedRoute,
    private translationHelper: TranslationHelper
  ) {
    this.currentLanguage = this.translationHelper.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.documentId = id;

        this.strapiService.getAllOffices().subscribe(
          (response: APIResponseModel) => {
            this.offices = response.data.map((office: IOffice) => ({
              ...office,
              office_image: {
                ...office.office_image,
                url: this.strapiUrl + (office.office_image.url || "../../../assets/images/img_n.a.png")
              },
              currentTime: this.getCurrentTime(office.office_location)
            }))
              .sort((a: IOffice, b: IOffice) => a.office_location.localeCompare(b.office_location));

            this.office = this.offices.find(office => office.documentId === this.documentId);

            if (this.office && this.office.currentTime) {
              this.formatCurrentTime(this.office.currentTime);
              this.titleService.setTitle(`${this.office.office_location} - Perpeture`);
              this.metaService.updateTag({
                name: 'description',
                content: `Learn more about our office in ${this.office.office_location}.`
              });
            } else {
              console.error('Office not found for the given document ID');
            }

            this.alignToNextMinute();
          },
          (error) => {
            console.error('Error fetching offices:', error);
          }
        );
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

  formatCurrentTime(currentTime: string): void {
    const [hoursMinutes, period] = currentTime.split(' ');
    const [hours, minutes] = hoursMinutes.split(':');
    this.formattedTime = { hours, minutes, period: period.toLowerCase() };
  }

  alignToNextMinute(): void {
    const now = new Date();
    const millisecondsUntilNextMinute = (60 - now.getSeconds()) * 1000;

    this.timeoutId = setTimeout(() => {
      this.updateCurrentTimes();
      this.intervalId = setInterval(() => {
        this.updateCurrentTimes();
      }, 60000);
    }, millisecondsUntilNextMinute);
  }

  updateCurrentTimes(): void {
    this.offices.forEach(office => {
      office.currentTime = this.getCurrentTime(office.office_location);
    });

    if (this.office && this.office.currentTime) {
      this.formatCurrentTime(this.office.currentTime);
    }
  }

  getCurrentTime(location: string): string {
    if (location === 'Christchurch') location = 'Pacific/Auckland';
    if (location === 'Sydney') location = 'Australia/Sydney';
    if (location === 'Yokohama') location = 'Asia/Tokyo';

    try {
      const date = new Date().toLocaleString("en-US", {
        timeZone: location,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      return date;
    } catch (error) {
      console.error(`Error fetching time for location ${location}:`, error);
      return "00:00 AM";
    }
  }

  openGoogleMaps(): void {
    let address = `${this.office?.address_1}, ${this.office?.address_2 ? this.office?.address_2 + ', ' : ''}${this.office?.city}, ${this.office?.country}`;
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    window.open(googleMapsUrl, '_blank');
  }
}