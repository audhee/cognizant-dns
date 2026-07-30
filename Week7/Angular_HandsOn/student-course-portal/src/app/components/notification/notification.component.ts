import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

/*
 * Hands-On 6 Step 67 Explanation Comment:
 * Specifying `providers: [NotificationService]` in the @Component decorator creates a component-level provider.
 * This instructs Angular's Hierarchical Dependency Injector to create a NEW, dedicated instance of NotificationService
 * scoped specifically to this component instance (and its child components), rather than sharing the root singleton instance.
 */

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService],
  template: `
    <div class="notification-box" *ngIf="message">
      <span>{{ message }}</span>
      <button (click)="clearMessage()">Dismiss</button>
    </div>
  `,
  styles: [`
    .notification-box {
      background-color: #eff6ff;
      border: 1px solid #93c5fd;
      color: #1e40af;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class NotificationComponent implements OnInit {
  message = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.message$.subscribe(msg => this.message = msg);
  }

  clearMessage(): void {
    this.notificationService.clear();
  }
}
