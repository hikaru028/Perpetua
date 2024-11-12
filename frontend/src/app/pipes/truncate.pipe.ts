import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
    standalone: true
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, wordLimit: number): string {
        if (!value) {
            return '';
        }

        const words = value.split(' ');
        if (words.length <= wordLimit) {
            return value; // If the text has fewer than the word limit, return as is
        }

        return words.slice(0, wordLimit).join(' ') + '...';
    }
}