import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../../book';
import { DbService } from '../../../db.service';

@Component({
  standalone: true,
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css'],
  providers: [DbService],
})
export class ReturnComponent implements OnInit {
  @Input() page!: string;
  @Input() foundBook!: Book;
  @Output() pageChange = new EventEmitter<string>();

  return() {
    this.db.returnBook(this.foundBook).subscribe();
    this.goTo('home');
  }

  goTo(page: string) {
    this.page = page;
    this.pageChange.emit(this.page);
  }
  constructor(private db: DbService) {}
  ngOnInit() {}
}
