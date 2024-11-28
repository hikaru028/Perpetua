// Libraries
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// Services
import { ICareer, IOffice } from '../../../../../util/interfaces';
import { TranslationHelper } from '../../../../shared/translation-helper';

@Component({
  selector: 'app-career-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-card.component.html',
  styleUrl: './career-card.component.scss'
})

export class CareerCardComponent {
  @Input() careers: ICareer[] = [];
}
