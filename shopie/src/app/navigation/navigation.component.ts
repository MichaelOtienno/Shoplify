import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  [x: string]: any;

  currentPage: string = ''
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = this.extractPageFromUrl(event.url);
      }
    });
  }

  private extractPageFromUrl(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 1];
  }


}
