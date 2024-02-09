import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { InsertComponent } from './insert/insert.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [CommonModule, InsertComponent, SearchComponent],
})
export class RootComponent implements OnInit {
  page: string = 'home';

  goTo(page: string): void {
    this.page = page;
  }
  constructor() {}
  ngOnInit() {}
}
