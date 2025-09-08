import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { QuickStatItem } from '../../config/dashboard-navigation.config';

@Component({
  selector: 'app-quick-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-stats.component.html',
  styleUrls: ['./quick-stats.component.scss'],
})
export class QuickStatsComponent implements OnInit {
  quickStats: QuickStatItem[] = [];

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.quickStats = this.navigationService.getQuickStats();
  }

  getProgressValue(stat: QuickStatItem): number {
    if (stat.type === 'progress' && typeof stat.value === 'number') {
      return stat.value;
    }
    return 0;
  }

  getDisplayValue(stat: QuickStatItem): string {
    if (stat.type === 'progress' && typeof stat.value === 'number') {
      return `${stat.value}%`;
    }
    return stat.value.toString();
  }
}
