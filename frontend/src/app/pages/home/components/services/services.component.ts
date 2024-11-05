import { Component } from '@angular/core';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    ServiceCardComponent,
    RouterLink,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
}
