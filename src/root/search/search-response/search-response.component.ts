import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../book';
import { DeleteComponent } from './delete/delete.component';
import { LoanComponent } from './loan/loan.component';
import { ReturnComponent } from './return/return.component';

@Component({
  standalone: true,
  selector: 'app-search-response',
  templateUrl: './search-response.component.html',
  styleUrls: ['./search-response.component.css'],
  imports: [CommonModule, DeleteComponent, LoanComponent, ReturnComponent],
})
export class SearchResponseComponent implements OnInit {
  @Input() page!: string;
  @Input() foundBook!: Book;
  @Output() pageChange = new EventEmitter<string>();

  goTo(page: string) {
    this.page = page;
    this.pageChange.emit(this.page);
  }
  constructor() {}
  ngOnInit() {}
}
