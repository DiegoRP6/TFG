import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-main',
  imports: [ToolbarComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true
})
export class MainComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
