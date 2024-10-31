import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from "./components/projects/projects.component";
import { ServicesComponent } from "./components/services/services.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { TeamComponent } from "./components/team/team.component";
import { NewsComponent } from "./components/news/news.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CallActionComponent } from "./components/call-action/call-action.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeroComponent,
    ProjectsComponent,
    ServicesComponent,
    ClientsComponent,
    TeamComponent,
    NewsComponent,
    FooterComponent,
    CallActionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
