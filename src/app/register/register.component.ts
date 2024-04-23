import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    if (this.email && this.password && this.name) {
      this.authService.register(this.email, this.password, this.name)
        .subscribe(
          (response) => {
            // Check the response for success or failure
            if (response === 'User registered successfully') {
              // Registration successful, navigate to the login page or any other route
              this.router.navigate(['/login']);
            } else {
              // Set error message for registration failure
              this.errorMessage = 'Registration failed';
            }
          },
          (error) => {
            // Handle error from the backend or network error
            console.error('Error registering user:', error);
            this.errorMessage = 'An error occurred while registering';
          }
        );
    } else {
      // Set error message if any field is empty
      this.errorMessage = 'Please fill in all fields';
    }
  }
}
