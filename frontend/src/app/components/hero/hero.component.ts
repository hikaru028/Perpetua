import { Component } from '@angular/core';
import { SlidesComponent } from "./components/slides/slides.component";
import { SlideTogglerComponent } from "./components/slide-toggler/slide-toggler.component";
import { HeaderNavComponent } from "./components/header-nav/header-nav.component";
import { LanguagesComponent } from "./components/languages/languages.component";
import { LogoComponent } from "./components/logo/logo.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SlidesComponent, SlideTogglerComponent, HeaderNavComponent, LanguagesComponent, LogoComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  firstName: string = 'John ';
  age: number = 30;
  isAdult: boolean = true;
  currentDate: Date = new Date();
}
