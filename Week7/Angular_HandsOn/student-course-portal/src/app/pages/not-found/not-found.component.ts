import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist in the Student Course Portal.</p>
      <a routerLink="/" class="btn-home">Return to Home</a>
    </div>
  `,
  styles: [`
    .not-found-container {
      text-align: center;
      padding: 4rem 1rem;
    }
    h1 { font-size: 5rem; color: #dc2626; margin: 0; }
    .btn-home {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.6rem 1.2rem;
      background: #0284c7;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  `]
})
export class NotFoundComponent {}
