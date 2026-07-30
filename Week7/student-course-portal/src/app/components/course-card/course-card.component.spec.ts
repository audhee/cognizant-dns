import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures & Algorithms',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        EnrollmentService,
        provideMockStore({
          selectors: [
            { selector: selectEnrolledIds, value: [] }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  // Task 102: Verification of component instantiation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Task 103: Verification of @Input rendering in DOM
  it('should display course name in title heading when input is set', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(titleElement.textContent).toContain('Data Structures & Algorithms');
  });

  // Task 104: Verification of @Output event emission on button click
  it('should emit enrollRequested event with course ID when enroll button clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    spyOn(component.enrollRequested, 'emit');

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const enrollButton = buttons[buttons.length - 1].nativeElement;
    enrollButton.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // Task 105: Verification of ngOnChanges hook execution with console spy
  it('should log previous and current values during ngOnChanges hook execution', () => {
    spyOn(console, 'log');

    const prevCourse: Course = { ...mockCourse, name: 'Old Course Name' };
    const currCourse: Course = { ...mockCourse, name: 'New Course Name' };

    component.ngOnChanges({
      course: new SimpleChange(prevCourse, currCourse, false)
    });

    expect(console.log).toHaveBeenCalledWith('CourseCardComponent ngOnChanges - Previous:', prevCourse);
    expect(console.log).toHaveBeenCalledWith('CourseCardComponent ngOnChanges - Current:', currCourse);
  });
});
