import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})

export class PrivacyComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {
  }

  ngOnInit(): void {
    // Meta info for SEO
    this.titleService.setTitle('Privacy - Perpeture');
    this.metaService.updateTag({ name: 'description', content: 'Learn how Perpeture values and protects your privacy. Discover detailed information about our privacy practices, data handling, and commitment to safeguarding your personal information.' });

    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
}
