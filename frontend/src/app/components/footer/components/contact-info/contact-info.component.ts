import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, CdkMenu, CdkMenuItem, CdkMenuTrigger],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {
  offices: any[] = [
    {
      country: 'New Zealand',
      phone: '+64 3 399 1111',
      email: 'hello@perpetua.studio'
    },
    {
      country: 'Australia',
      phone: '+61 3 399 1112',
      email: 'hello@perpetua-au.studio'
    },
    {
      country: 'Japan',
      phone: '+81 3 399 1113',
      email: 'hello@perpetua-jp.studio'
    }
  ]
  selectedOfficeIndex: number = 0;

  onOfficeSelected(index: number): void {
    this.selectedOfficeIndex = index;
  }
}
