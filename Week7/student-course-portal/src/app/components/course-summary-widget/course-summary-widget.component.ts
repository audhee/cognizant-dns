import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-widget">
      <h4>Course Summary Widget (Shared Service Singleton)</h4>
      <p>Total Available Courses registered in CourseService: <strong>{{ totalCourses }}</strong></p>
    </div>
  `,
  styles: [`
    .summary-widget {
      background-color: #f1f5f9;
      border: 1px dashed #94a3b8;
      padding: 1rem;
      border-radius: 6px;
    }
    h4 { margin-top: 0; color: #334155; }
  `]
})
export class CourseSummaryWidgetComponent implements OnInit {
  totalCourses = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.totalCourses = this.courseService.getInitialCourses().length;
    this.courseService.getCourses().subscribe(courses => {
      if (courses && courses.length > 0) {
        this.totalCourses = courses.length;
      }
    });
  }
}
