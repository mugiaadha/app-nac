import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing-module';
import { HomeComponent } from './home.component';
import { HeroSectionComponent } from '../../sections/hero-section/hero-section.component';
import { AboutSectionComponent } from '../../sections/about-section/about-section.component';
import { CategorySectionComponent } from '../../sections/category-section/category-section.component';
import { NewestSectionComponent } from '../../sections/newest-section/newest-section.component';
import { PopularSectionComponent } from '../../sections/popular-section/popular-section.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeroSectionComponent,
    AboutSectionComponent,
    CategorySectionComponent,
    NewestSectionComponent,
    PopularSectionComponent,
  ],
})
export class HomeModule {}
