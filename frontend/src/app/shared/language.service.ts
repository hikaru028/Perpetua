import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private selectedLanguageSubject = new BehaviorSubject<string>('English');
    selectedLanguage$ = this.selectedLanguageSubject.asObservable();

    updateLanguage(newLanguage: string) {
        this.selectedLanguageSubject.next(newLanguage);
    }
}
