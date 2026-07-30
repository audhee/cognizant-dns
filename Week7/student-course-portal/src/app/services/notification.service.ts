import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NotificationService {
  private messageSubject = new BehaviorSubject<string>('');
  public message$: Observable<string> = this.messageSubject.asObservable();

  notify(msg: string): void {
    this.messageSubject.next(msg);
  }

  clear(): void {
    this.messageSubject.next('');
  }
}
