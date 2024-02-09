import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../book';
import { DbService } from '../db.service';
import { SearchResponseComponent } from './search-response/search-response.component';

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [CommonModule, SearchResponseComponent],
  providers: [DbService],
})
export class SearchComponent implements OnInit {
  @Input() page!: string;
  @Output() pageChange = new EventEmitter<string>();

  occ: number = 0;
  foundBook: Book = new Book('', '', '', '');

  search(query: string) {
    this.db.searchBook(query).subscribe((results: Book[]) => {
      this.occ = results.length;
      if (results.length === 1) {
        this.foundBook = results[0];
        this.goTo('document');
      }
    });
  }

  goTo(page: string) {
    this.page = page;
    this.pageChange.emit(this.page);
    this.occ = 0;
  }
  constructor(private db: DbService) {}
  ngOnInit() {}
}
