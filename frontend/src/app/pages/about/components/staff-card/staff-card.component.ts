// Libraries
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
// Services
import { IMember } from '../../../../../util/interfaces';

@Component({
  selector: 'app-staff-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-card.component.html',
  styleUrl: './staff-card.component.scss'
})
export class StaffCardComponent implements OnChanges {
  @Input() member: IMember | undefined;
  sanitizedBios: { [key: number]: SafeHtml } = {};

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member'] && this.member?.bio) {
      this.parseContent();
    }
  }

  parseContent(): void {
    if (this.member?.bio) {
      const parsedContent: any = marked.parse(this.member.bio);
      this.sanitizedBios[this.member.id] = this.sanitizer.bypassSecurityTrustHtml(parsedContent);
    }
  };
}
