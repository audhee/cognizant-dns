import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

export interface Student {
  id: number;
  name: string;
  email: string;
  courseId: number;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [1, 2];

  constructor(private courseService: CourseService) {}

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourseIds(): number[] {
    return [...this.enrolledCourseIds];
  }

  getEnrolledCourses(): Course[] {
    const allCourses = this.courseService.getInitialCourses();
    return allCourses.filter(c => this.enrolledCourseIds.includes(c.id));
  }

  // Hands-On 8 Step 87: Used for switchMap demonstration chaining course selection to student loading
  getStudentsByCourse(courseId: number): Observable<Student[]> {
    const mockStudents: Student[] = [
      { id: 101, name: 'Alice Smith', email: 'alice@example.com', courseId },
      { id: 102, name: 'Bob Johnson', email: 'bob@example.com', courseId }
    ];
    return of(mockStudents);
  }
}
