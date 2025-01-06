import { AfterViewInit, Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    const video: HTMLVideoElement | null = document.getElementById('background.mp4') as HTMLVideoElement;
    if (video) {
      video.muted = true; // Mute the video for autoplay compatibility
      video.play();
    }
  }
}
