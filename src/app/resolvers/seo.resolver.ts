import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoResolver implements Resolve<void> {
  constructor(private title: Title, private meta: Meta) {}

  resolve(route: ActivatedRouteSnapshot): void {
    const seo = route.data['seo'];
    if (seo) {
      if (seo.title) this.title.setTitle(seo.title);
      if (seo.description)
        this.meta.updateTag({ name: 'description', content: seo.description });
      if (seo.keywords)
        this.meta.updateTag({ name: 'keywords', content: seo.keywords });
    }
  }
}
