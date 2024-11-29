// Libraries
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Services
import { IOffice } from '../../../../../util/interfaces';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})
export class LocationCardComponent {
  @Input() office: IOffice | undefined;

  openGoogleMaps(office: IOffice): void {
    let address = `${office.address_1}, ${office.address_2 ? office.address_2 + ', ' : ''}${office.city}, ${office.country}`;
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    window.open(googleMapsUrl, '_blank');
  }

  sendEmail(): void {
    if (this.office?.email) {
      const mailtoLink = `mailto:${this.office.email}`;
      window.location.href = mailtoLink;
    }
  }

  sendEmailKeyDown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || event.key === ' ') && this.office?.email) {
      event.preventDefault();
      this.sendEmail();
    }
  }
}
