import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development'

@Component({
  selector: 'app-share-article-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-article-button.component.html',
  styleUrl: './share-article-button.component.scss'
})
export class ShareArticleButtonComponent {
  @Input() articleDocumentId: string = '';
  @Input() articleTitle: string = '';
  @Input() position?: string = '';
  isModalVisible: boolean = false;
  strapiUrl = environment.strapiUrl;

  get articleUrl(): string {
    return `${this.strapiUrl}/articles/${this.articleDocumentId}`;
  }

  get isFooterPosition(): boolean {
    return this.position === 'footer';
  }

  showModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  shareOnTwitter() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.articleTitle)}&url=${encodeURIComponent(this.articleUrl)}`;
    window.open(twitterUrl, '_blank');
  }

  shareOnLinkedIn() {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.articleUrl)}`;
    window.open(linkedInUrl, '_blank');
  }

  shareOnFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.articleUrl)}`;
    window.open(facebookUrl, '_blank');
  }

  shareByEmail() {
    const subject = `Check out this article: ${this.articleTitle}`;
    const body = `I thought you might find this interesting: ${this.articleTitle}\n\n${this.articleUrl}`;
    const mailToUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailToUrl;
  }
}