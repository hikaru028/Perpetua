// Libraries
import { Component, Input } from '@angular/core';
// Components
// Services
import { IOffice } from '../../../../../util/interfaces';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [],
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})
export class LocationCardComponent {
  @Input() offices: IOffice[] = [];
}
