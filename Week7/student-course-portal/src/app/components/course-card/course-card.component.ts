import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { EnrollmentService } from '../../services/enrollment.service';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnChanges {
  // Task 18 & 20: Input property
  @Input() course!: Course;

  // Task 21: Output event emitter
  @Output() enrollRequested = new EventEmitter<number>();

  // Task 31: Card expansion state
  isExpanded = false;

  // NgRx enrollment state observable
  enrolledIds$: Observable<number[]>;

  constructor(
    private enrollmentService: EnrollmentService,
    private store: Store
  ) {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  // Task 18: ngOnChanges hook logging previous and current input values
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('CourseCardComponent ngOnChanges - Previous:', changes['course'].previousValue);
      console.log('CourseCardComponent ngOnChanges - Current:', changes['course'].currentValue);
    }
  }

  // Task 32 Comment & Getter:
  // Using a getter keeps the HTML template clean, declarative, and easily testable in TypeScript code.
  get cardClasses(): { [key: string]: boolean } {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': !!(this.course && this.course.credits >= 4),
      'expanded': this.isExpanded
    };
  }

  // Task 30: Dynamic border color inline style getter
  get cardStyle(): { [key: string]: string } {
    const status = this.course?.gradeStatus;
    let borderColor = '#94a3b8'; // grey pending
    if (status === 'passed') borderColor = '#22c55e'; // green
    if (status === 'failed') borderColor = '#ef4444'; // red
    return { 'border-left': `6px solid ${borderColor}` };
  }

  get isEnrolled(): boolean {
    if (!this.course) return false;
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(): void {
    if (!this.course) return;

    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
      this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.enrollmentService.enroll(this.course.id);
      this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId: this.course.id }));
    }

    this.enrollRequested.emit(this.course.id);
  }
}
