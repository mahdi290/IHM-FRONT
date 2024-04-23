import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceModel } from '../service'; // Make sure to import the ServiceModel interface
import { ServiceService } from '../service.service'; // Import the ServiceService to interact with the backend API

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  newService: ServiceModel = {
    prestataire: '',
    name: '',
    subcategorie: '',
    categorie: '',
    prix: 0,
    imageUrl: '',
    id: 0
  };
  errorMessage: string = '';

  constructor(private router: Router, private serviceService: ServiceService) {}

  onAddService(event: Event): void {
    event.preventDefault(); // Prevent the default form submission behavior

    // Call the addService method of the ServiceService to add the new service
    this.serviceService.addService(this.newService)
      .subscribe(
        (response) => {
          // Check the response for success or failure
          if (response) {
            // Service added successfully, navigate to the desired route
            this.router.navigate(['/homeservice']);
          } else {
            // Set error message for service addition failure
            this.errorMessage = 'Failed to add service';
          }
        },
        (error) => {
          // Handle error from the backend or network error
          console.error('Error adding service:', error);
          this.errorMessage = 'An error occurred while adding service';
        }
      );
  }
}
