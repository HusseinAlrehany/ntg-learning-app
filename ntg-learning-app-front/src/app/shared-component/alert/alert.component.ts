import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert success" *ngIf="message">
      {{ message }}
    </div>
  `,
  styles: [`
    .alert {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 14px 20px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 9999;
      animation: fadeIn 0.3s ease;
    }

    .success {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #10b981;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AlertComponent {
  @Input() message = '';
}
