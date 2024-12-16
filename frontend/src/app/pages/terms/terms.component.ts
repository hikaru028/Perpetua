import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})

export class TermsComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {
  }

  ngOnInit(): void {
    // Meta info for SEO
    this.titleService.setTitle('Terms - Perpeture');
    this.metaService.updateTag({ name: 'description', content: 'Understand the terms and conditions for using Perpeture. Explore detailed guidelines on our services, user responsibilities, and legal agreements.' });

    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
} 
