// Libraries
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Services
import { IClient } from '../../../../../util/interfaces';

@Component({
  selector: 'app-client-block',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-block.component.html',
  styleUrl: './client-block.component.scss'
})
export class ClientBlockComponent {
  @Input() clients: IClient[] = [];
}
