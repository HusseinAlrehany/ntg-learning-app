import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { NotificationService } from './services/notification/notification.service';
import { AlertComponent } from './shared-component/alert/alert.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,AlertComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ntg-learning-app-front';
  
  successMessage = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.message$.subscribe(message => {
      this.successMessage = message;

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    });
  }

}
