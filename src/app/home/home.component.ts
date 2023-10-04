import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  prevSlide(): void {
    // Navigate to the previous slide
    const carousel = document.getElementById('carouselExample');
    if (carousel) {
      (carousel as any).carousel('prev');
    }
  }

  nextSlide(): void {
    // Navigate to the next slide
    const carousel = document.getElementById('carouselExample');
    if (carousel) {
      (carousel as any).carousel('next');
    }
  }
  

}
