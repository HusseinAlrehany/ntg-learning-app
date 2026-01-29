import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeveloperService } from '../../service/developer.service';
import { CategoryInfo } from '../../../../models/category-info';
import { HttpErrorResponse } from '@angular/common/http';

interface ProgressStat {
  month: string;
  percentage: number;
  topicsCompleted: number;
}

@Component({
  selector: 'app-progress-stats',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './progress-stats.component.html',
  styleUrl: './progress-stats.component.css'
})
export class ProgressStatsComponent implements OnInit {

  categories: CategoryInfo[] = [];
  errorMessage = '';
  
  // Overall statistics
  totalProgress = 0;
  totalTopics = 0;
  masteredTopics = 0;
  inProgressTopics = 0;
  notStartedTopics = 0;
  
  // Category breakdown
  categoryStats: Array<{name: string; progress: number; mastered: number; total: number}> = [];
  
  // Status breakdown
  statusStats = {
    mastered: 0,
    inProgress: 0,
    notStarted: 0
  };

  constructor(private devService: DeveloperService) {}

  ngOnInit(): void {
    this.loadProgressStats();
  }

  loadProgressStats(): void {
    this.devService.getAllCategoriesWithProgress().subscribe({
      next: (res: CategoryInfo[]) => {
        this.categories = res;
        this.calculateStats();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.errorMessage || 'Failed to load progress data';
      }
    });
  }

  private calculateStats(): void {
    this.totalTopics = 0;
    this.masteredTopics = 0;
    this.inProgressTopics = 0;
    this.notStartedTopics = 0;
    this.categoryStats = [];

    this.categories.forEach(category => {
      this.totalTopics += category.totalTopics;
      this.masteredTopics += category.masteredTopics;

      // Count topics by status
      category.topicWithProgressList.forEach(topic => {
        switch (topic.status) {
          case 'MASTERED':
            break; // Already counted in masteredTopics
          case 'IN_PROGRESS':
            this.inProgressTopics++;
            break;
          case 'NOT_STARTED':
            this.notStartedTopics++;
            break;
        }
      });

      // Category breakdown
      this.categoryStats.push({
        name: category.categoryName,
        progress: category.categoryProgress,
        mastered: category.masteredTopics,
        total: category.totalTopics
      });
    });

    // Calculate overall progress
    this.totalProgress = this.totalTopics > 0 ? Math.round((this.masteredTopics / this.totalTopics) * 100) : 0;

    // Status breakdown
    this.statusStats = {
      mastered: this.masteredTopics,
      inProgress: this.inProgressTopics,
      notStarted: this.notStartedTopics
    };
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return '#10b981'; // Green
    if (progress >= 50) return '#3b82f6'; // Blue
    if (progress >= 20) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  }

  getMasteredPercentage(): number {
    return this.totalTopics > 0 ? Math.round((this.masteredTopics / this.totalTopics) * 100) : 0;
  }

  getInProgressPercentage(): number {
    return this.totalTopics > 0 ? Math.round((this.inProgressTopics / this.totalTopics) * 100) : 0;
  }

  getNotStartedPercentage(): number {
    return this.totalTopics > 0 ? Math.round((this.notStartedTopics / this.totalTopics) * 100) : 0;
  }
}
