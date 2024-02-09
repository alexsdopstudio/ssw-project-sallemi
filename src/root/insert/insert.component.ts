import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../book';
import { DbService } from '../db.service';

@Component({
  standalone: true,
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'],
  imports: [CommonModule],
  providers: [DbService],
})
export class InsertComponent implements OnInit {
  @Input() page!: string;
  @Output() pageChange = new EventEmitter<string>();

  uploadBook(author: string, title: string, id: string) {
    const newBook = new Book(id, author, title, '');
    this.db.addBook(newBook).subscribe();
    this.goTo('home');
  }

  goTo(page: string) {
    this.page = page;
    this.pageChange.emit(this.page);
  }
  constructor(private db: DbService) {}
  ngOnInit() {}
}
