import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ComponentCanDeactivate } from '../../guards/unsaved-changes.guard';

// Task 53: Custom synchronous validator
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const val = String(control.value || '').toUpperCase();
  if (val.startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Task 55: Custom asynchronous validator
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const email = String(control.value || '').toLowerCase();
      if (email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrls: ['./reactive-enrollment-form.component.css']
})
export class ReactiveEnrollmentFormComponent implements OnInit, ComponentCanDeactivate {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  // Task 49: Form Initialization with FormBuilder
  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  /*
   * Task 57 Comment & Getter:
   * Defining a typed getter `get additionalCourses()` avoids complex inline type casting in the HTML template (e.g. `$any(enrollForm.get('additionalCourses')).controls`).
   * This provides full TypeScript type safety, autocomplete, and keeps the template clean and readable.
   */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // Task 56: Add dynamic course control to FormArray
  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  // Task 56: Remove dynamic course control from FormArray
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  // Task 51 & 52: Form submission and value comparison
  onSubmit(): void {
    /*
     * Task 52 Comment:
     * Difference between `enrollForm.value` and `enrollForm.getRawValue()`:
     * - `enrollForm.value` returns an object containing values for active controls ONLY (excludes disabled form controls).
     * - `enrollForm.getRawValue()` returns an object containing values for ALL controls regardless of whether they are enabled or disabled.
     */
    console.log('Reactive Form Value (active controls):', this.enrollForm.value);
    console.log('Reactive Form Raw Value (includes disabled controls):', this.enrollForm.getRawValue());

    if (this.enrollForm.valid) {
      this.submitted = true;
    }
  }

  // Task 77: CanDeactivate check for dirty form
  canDeactivate(): boolean {
    if (this.enrollForm && this.enrollForm.dirty && !this.submitted) {
      return window.confirm('You have unsaved changes. Leave?');
    }
    return true;
  }
}
