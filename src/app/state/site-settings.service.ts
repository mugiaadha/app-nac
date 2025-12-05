import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SiteSettings } from '../models/site-settings.model';
import { environment } from '../../environment';

const BASE_URL = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class SiteSettingsService {
  private settingsSubject = new BehaviorSubject<SiteSettings>({
    title: 'SAS Tax Center',
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
