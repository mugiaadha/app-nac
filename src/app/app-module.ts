import { App } from './app';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutSectionComponent } from './sections/about-section/about-section.component';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
