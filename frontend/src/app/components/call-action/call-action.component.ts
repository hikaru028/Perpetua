import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-call-action',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './call-action.component.html',
  styleUrl: './call-action.component.scss'
})
export class CallActionComponent {

}
