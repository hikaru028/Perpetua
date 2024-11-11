// Libraries
import { Component, inject, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { ProjectCardComponent } from '../../../../../components/project-card/project-card.component';
// Services
import { ProjectService } from '../../../../../shared/project.service';
import { IProject } from '../../../../../../util/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-more-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './more-projects.component.html',
  styleUrl: './more-projects.component.scss'
})
export class MoreProjectsComponent implements OnChanges {
  moreProjects$: Observable<IProject[]>;
  @Input() currentProjectDocumentId: string | null = null;
  projectService: ProjectService = inject(ProjectService);


  constructor() {
    this.moreProjects$ = this.projectService.moreProjects$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentProjectDocumentId'] && changes['currentProjectDocumentId'].currentValue) {
      this.projectService.selectMoreProjectByDate(changes['currentProjectDocumentId'].currentValue);
    }
  }
}
