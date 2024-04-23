import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
        .subscribe(
          (response) => {
            // Check the response for success or failure
            if (response === 'User logged in successfully') {
              // Navigate to the home page or any other route upon successful login
              this.router.navigate(['/homeservice']);
            } else {
              // Set error message for invalid credentials
              this.errorMessage = 'Invalid email or password';
            }
          },
          (error: HttpErrorResponse) => { // Modify the error parameter type to HttpErrorResponse
            // Handle error from the backend or network error
            console.error('Error logging in:', error);
            if (error.status === 401) {
              this.errorMessage = 'Invalid email or password'; // Unauthorized error
            } else {
              this.errorMessage = 'An error occurred while logging in'; // Other errors
            }
          }
        );
    } else {
      // Set error message if email or password is empty
      this.errorMessage = 'Please enter both email and password';
    }
  }
}
