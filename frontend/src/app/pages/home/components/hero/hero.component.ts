import { Component } from '@angular/core';
import { SlidesComponent } from "./components/slides/slides.component";
import { LanguagesComponent } from "./components/languages/languages.component";
import { LogoComponent } from "./components/logo/logo.component";
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SlidesComponent, LanguagesComponent, LogoComponent, MenuComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  firstName: string = 'John ';
  age: number = 30;
  isAdult: boolean = true;
  currentDate: Date = new Date();
}
