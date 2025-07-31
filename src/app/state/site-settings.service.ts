import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SiteSettings } from '../models/site-settings.model';

const BASE_URL = 'https://backend.nacademy.my.id/api';

@Injectable({ providedIn: 'root' })
export class SiteSettingsService {
  private settingsSubject = new BehaviorSubject<SiteSettings>({
    title: 'Nac Tax Center',
    favicon: 'favicon.ico',
  });
  settings$ = this.settingsSubject.asObservable();

  constructor(private http: HttpClient) {}

  updateSettings(settings: Partial<SiteSettings>) {
    this.settingsSubject.next({ ...this.settingsSubject.value, ...settings });
  }

  fetchSettings() {
    this.http.get<any>(`${BASE_URL}/site-settings`).subscribe((res) => {
      if (res.success && res.data) {
        this.settingsSubject.next({
          ...this.settingsSubject.value,
          ...res.data,
        });
      }
    });
  }
}
