// Libraries
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Services
import { IOffice } from '../../../../../util/interfaces';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [CommonModule],
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
}
