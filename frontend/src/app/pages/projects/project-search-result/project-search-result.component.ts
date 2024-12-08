import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-search-result',
  standalone: true,
  imports: [],
  templateUrl: './project-search-result.component.html',
  styleUrl: './project-search-result.component.scss'
})
export class ProjectSearchResultComponent implements OnInit {
  keyword: string = '';
  filteredProjects: any[] = [];
  allProjects: any[] = []; // Assume this comes from a service

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.keyword = params['keyword'] || '';
      this.filterProjects();
    });
  }

  filterProjects(): void {
    this.filteredProjects = this.allProjects.filter((project) =>
      project.project_title.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }
}
