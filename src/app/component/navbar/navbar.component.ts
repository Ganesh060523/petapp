import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RefreshService } from '../../refresh-service.service';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: any = null; // Holds user details
  userFirstLetter: string = ''; // Stores the first letter of the user's name
  dropdownOpen: boolean = false; // Tracks dropdown state
  isAdmin: boolean = false; // Tracks admin status
  private refreshSubscription!: Subscription;



  constructor(public authService: AuthService, private router: Router, private refreshService: RefreshService) {}

  ngOnInit(): void {

    this.initializeNavbar();

    // Subscribe to refresh events
    this.refreshSubscription = this.refreshService.getRefreshObservable().subscribe(() => {
      this.initializeNavbar();
    });


   


    
  }


  initializeNavbar(): void {

    if (this.authService.isLoggedIn()) {
      this.user = this.authService.getUserData();
      this.isAdmin = this.user?.role === 'ADMIN'; // Assuming role is part of user data
      this.userFirstLetter = this.user?.name?.charAt(0).toUpperCase() || ''; // Extract and capitalize the first letter

      console.log("first letter "+  this.user?.name?.charAt(0).toUpperCase())
    }

  }

 

  toggleDropdown(event: Event): void {
    event.stopPropagation(); // Prevents click from closing the dropdown immediately
    this.dropdownOpen = !this.dropdownOpen;
  }


  onLogout(): void {
    this.authService.clearAuth();
    this.refreshService.triggerRefresh();
    this.isAdmin=false;// Notify navbar to refresh
    this.router.navigate(['/home']);
  }


    // Close the dropdown menu if clicked outside
    @HostListener('document:click', ['$event'])
    closeDropdown(event: Event): void {
      const target = event.target as HTMLElement;
  
      // Close dropdown if clicked outside the dropdown
      if (!target.closest('.navbar-actions')) {
        this.dropdownOpen = false;
      }
    }


  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe(); // Clean up subscription
    }
  }
}