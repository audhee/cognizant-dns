import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { EnrollmentService, Student } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  enrolledStudents: Student[] = [];
  errorMessage = '';

  /*
   * Hands-On 8 Step 87 Comment:
   * switchMap operator cancels any previous pending inner Observable request whenever a new outer item arrives.
   * In autocomplete search or course selection, if a user quickly switches between course selection IDs,
   * switchMap ensures outdated HTTP responses are discarded, preventing race conditions and out-of-order state updates.
   */

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    // Hands-On 7 Step 69: Read route parameter :id
    const idParam = this.route.snapshot.paramMap.get('id');
    const courseId = Number(idParam);

    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe({
        next: course => this.course = course,
        error: err => this.errorMessage = err.message || 'Course not found'
      });

      // Hands-On 8 Step 87: Demonstration of switchMap operator chaining course parameter to student fetching
      this.route.paramMap.pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          return this.enrollmentService.getStudentsByCourse(id);
        })
      ).subscribe(students => {
        this.enrolledStudents = students;
      });
    }
  }
}
