// Libraries
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Services
import { IClient } from '../../../../../util/interfaces';

@Component({
  selector: 'app-client-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-block.component.html',
  styleUrl: './client-block.component.scss'
})
export class ClientBlockComponent {
  @Input() clients: IClient[] = [];
}
