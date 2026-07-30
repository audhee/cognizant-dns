import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  student = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    id: 101,
    gpa: 3.8
  };

  enrolledCourses: Course[] = [];

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    // Hands-On 6 Step 66: Fetch enrolled courses from EnrollmentService
    this.enrolledCourses = this.enrollmentService.getEnrolledCourses();
  }
}
