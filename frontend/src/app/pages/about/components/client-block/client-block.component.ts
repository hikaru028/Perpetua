// Libraries
import { Component, Input } from '@angular/core';
// Components
// Services
import { IClient } from '../../../../../util/interfaces';

@Component({
  selector: 'app-client-block',
  standalone: true,
  imports: [],
  templateUrl: './client-block.component.html',
  styleUrl: './client-block.component.scss'
})
export class ClientBlockComponent {
  @Input() clients: IClient[] = [];
}