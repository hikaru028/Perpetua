
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IClient } from '../../../../util/interfaces';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent {
  @Input() clients: IClient[] = [];
}
