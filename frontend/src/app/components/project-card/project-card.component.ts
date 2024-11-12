// Libraries
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
// Services
import { IProject } from '../../../util/interfaces';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() projects: IProject[] = [];
  @Input() showTitleAsIndustry: boolean = false;

  constructor(private router: Router) { }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  navigateToProject(documentId: string): void {
    this.scrollToTop();
    this.router.navigate(['/projects', documentId]);
  }

  onKeyDown(event: KeyboardEvent, documentId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.navigateToProject(documentId);
    }
  }
}