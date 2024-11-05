import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IClient } from '../../../../../../../util/interfaces';

@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss'
})
export class ClientCardComponent {
  @Input() clients: IClient[] = [];
  @Output() clientSelected = new EventEmitter<number>();

  selectClient(index: number): void {
    this.clientSelected.emit(index);
  }
}
