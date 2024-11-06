import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMember } from '../../../../../../../util/interfaces'

@Component({
  selector: 'app-staff-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-card.component.html',
  styleUrl: './staff-card.component.scss'
})
export class StaffCardComponent {
  @Input() members: IMember[] = [];
}
