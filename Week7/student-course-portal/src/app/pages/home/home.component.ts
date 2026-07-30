import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseSummaryWidgetComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Task 11: String interpolation property
  portalName = 'Student Course Portal';

  // Task 12: Property binding flag
  isPortalActive = true;

  // Task 13: Event binding message
  message = '';

  // Task 14: Two-way binding property
  searchTerm = '';

  // Stats
  coursesAvailableCount = 0;
  enrolledCount = 3;
  gpa = 3.8;

  /*
   * Task 15 Comment:
   * Difference between [property] and [(ngModel)]:
   * [property] is one-way property binding (Component -> DOM). Data flows from the component class to update the DOM element property.
   * [(ngModel)] is two-way data binding (DOM <-> Component). Data changes in the template (input fields) automatically update the component property,
   * and component property updates automatically reflect in the template DOM.
   */

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  // Task 16: ngOnInit lifecycle hook
  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    this.coursesAvailableCount = this.courseService.getInitialCourses().length;
    this.courseService.getCourses().subscribe(courses => {
      if (courses && courses.length > 0) {
        this.coursesAvailableCount = courses.length;
      }
    });
  }

  // Task 17: ngOnDestroy lifecycle hook
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  // Task 13: Event handler
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
    this.router.navigate(['/enroll-reactive']);
  }
}
