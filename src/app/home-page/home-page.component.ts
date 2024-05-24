import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-home-page',
  imports: [ToolbarComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true
})
export class HomePageComponent {
  constructor(private router: Router) {}

  redirect() {
    this.router.navigate(['/main']); 
  }
}