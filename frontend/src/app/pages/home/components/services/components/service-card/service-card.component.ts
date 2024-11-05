import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IService } from '../../../../../../../util/interfaces';
import { ServiceData } from '../../service-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})

export class ServiceCardComponent {
  services: IService[] = ServiceData;

  isVisible: boolean[] = new Array(this.services.length).fill(false);

  showDescription(index: number): void {
    this.isVisible[index] = !this.isVisible[index];
  }
}