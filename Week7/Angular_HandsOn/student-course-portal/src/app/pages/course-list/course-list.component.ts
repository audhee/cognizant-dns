import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { CourseCardComponent } from '../../components/course-card/course-card.component';

import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  // Task 25: Loading flag
  isLoading = true;
  errorMessage: string | null = null;
  selectedCourseId: number | null = null;

  searchTerm = '';
  courses: Course[] = [];

  // Hands-On 9: NgRx Store Observables
  courses$: Observable<Course[]>;
  storeLoading$: Observable<boolean>;
  storeError$: Observable<string | null>;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.storeLoading$ = this.store.select(selectCoursesLoading);
    this.storeError$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    // Hands-On 7 Step 71: Read query parameter
    const searchParam = this.route.snapshot.queryParamMap.get('search');
    if (searchParam) {
      this.searchTerm = searchParam;
    }

    // Hands-On 9 Task 1: Dispatch NgRx action to load courses
    this.store.dispatch(CourseActions.loadCourses());

    // Hands-On 8 Task 1 Step 80: Subscribe to CourseService
    this.courseService.getCourses().subscribe({
      next: courses => {
        this.courses = courses;
      },
      error: err => {
        this.errorMessage = err.message || 'Failed to load courses';
        this.isLoading = false;
      },
      complete: () => {
        // Task 25: Loading spinner completion delay
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      }
    });
  }

  /*
   * Task 26 Comment:
   * trackBy allows Angular to identify which items in an iterable list have changed, been added, or removed.
   * Without trackBy, any change to the array causes Angular to destroy and re-render all DOM elements in the list.
   * By tracking by course.id, Angular re-uses existing DOM nodes, providing significant performance optimization for large lists.
   */
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  onCardClick(courseId: number): void {
    // Hands-On 7 Step 70: Navigate to detail route
    this.router.navigate(['courses', courseId]);
  }

  onSearchChange(): void {
    // Hands-On 7 Step 71: Update query parameter in URL
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm || null } });
  }

  get filteredCourses(): Course[] {
    if (!this.searchTerm) return this.courses;
    return this.courses.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
