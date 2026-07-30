import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses via HTTP GET and filter positive credits', () => {
    const dummyCourses: Course[] = [
      { id: 1, name: 'Angular Basics', code: 'CS101', credits: 4, gradeStatus: 'passed' },
      { id: 2, name: 'Zero Credit Seminar', code: 'CS100', credits: 0, gradeStatus: 'pending' }
    ];

    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(1);
      expect(courses[0].name).toBe('Angular Basics');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourses);
  });
});
