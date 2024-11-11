// Libraries
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { IProject } from '../../../../../../util/interfaces'

@Component({
  selector: 'app-project-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-content.component.html',
  styleUrl: './project-content.component.scss'
})
export class ProjectContentComponent {
  @Input() project: IProject | undefined;
}
