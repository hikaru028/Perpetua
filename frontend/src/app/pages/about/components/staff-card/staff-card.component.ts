// Libraries
import { Component, Input } from '@angular/core';
// Components
// Services
import { IMember } from '../../../../../util/interfaces';

@Component({
  selector: 'app-staff-card',
  standalone: true,
  imports: [],
  templateUrl: './staff-card.component.html',
  styleUrl: './staff-card.component.scss'
})
export class StaffCardComponent {
  @Input() members: IMember[] = [];
}
