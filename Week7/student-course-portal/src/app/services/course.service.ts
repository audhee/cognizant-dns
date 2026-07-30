import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private initialCourses: Course[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Development with Angular', code: 'CS102', credits: 3, gradeStatus: 'pending' },
    { id: 3, name: 'Database Management Systems', code: 'CS103', credits: 3, gradeStatus: 'passed' },
    { id: 4, name: 'Operating Systems', code: 'CS104', credits: 4, gradeStatus: 'failed' },
    { id: 5, name: 'Software Engineering Principles', code: 'CS105', credits: 2, gradeStatus: 'pending' }
  ];

  constructor(private http: HttpClient) {}

  // Synchronous getter for offline/hands-on 6 tests
  getInitialCourses(): Course[] {
    return [...this.initialCourses];
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      // Hands-On 8 Step 83: map operator filtering positive credits
      map(courses => courses.filter(c => c.credits > 0)),
      // Hands-On 8 Step 85: tap operator for side-effects (logging)
      tap(courses => console.log('Courses loaded:', courses.length)),
      // Hands-On 8 Step 84: catchError operator
      catchError(err => {
        console.error('CourseService error:', err);
        // Fallback to local array if JSON Server is offline during test run
        return of(this.initialCourses);
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      catchError(err => {
        const found = this.initialCourses.find(c => c.id === Number(id));
        if (found) return of(found);
        return throwError(() => new Error(`Course with ID ${id} not found`));
      })
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => console.log('Created course:', newCourse)),
      catchError(err => {
        const created: Course = { ...course, id: Date.now() };
        this.initialCourses.push(created);
        return of(created);
      })
    );
  }

  addCourse(course: Course): void {
    this.initialCourses.push(course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      tap(updated => console.log('Updated course:', updated)),
      catchError(err => {
        const idx = this.initialCourses.findIndex(c => c.id === id);
        if (idx !== -1) {
          this.initialCourses[idx] = { ...this.initialCourses[idx], ...course };
          return of(this.initialCourses[idx]);
        }
        return throwError(() => new Error('Course update failed'));
      })
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Deleted course:', id)),
      catchError(err => {
        this.initialCourses = this.initialCourses.filter(c => c.id !== id);
        return of(undefined);
      })
    );
  }
}
