import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  imports: [ToolbarComponent,     
            MatToolbarModule,
            MatIconModule ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true
})
export class MainComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
