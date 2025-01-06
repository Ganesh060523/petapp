import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './ManagePet.component.html',
  styleUrl: './ManagePet.component.css'
})
export class ManagePetComponent implements OnInit {
  username: any;
  constructor(private router: Router,private authService: AuthService) {
    
  }
  ngOnInit(): void {
    // Get current user's name from the AuthService
    this.username = this.authService.getCurrentUser().name;
  }
  
  goToPet(){
    this.router.navigate(['home/mypet']);
  }
  goToMypet(){
    this.router.navigate(['home/mypetreq']);
  }
  goToMyreq(){
    this.router.navigate(['home/ireq']);
  }
  
  
}
