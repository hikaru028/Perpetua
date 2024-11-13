// Libraries
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
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
  @Input() offices: IOffice[] = [];
}
