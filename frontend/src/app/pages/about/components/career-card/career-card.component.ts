// Libraries
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Services
import { ICareer, IOffice } from '../../../../../util/interfaces';

@Component({
  selector: 'app-career-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-card.component.html',
  styleUrl: './career-card.component.scss'
})

export class CareerCardComponent {
  @Input() careers?: ICareer[] = [];
  @Input() career?: ICareer | null = null;
}
