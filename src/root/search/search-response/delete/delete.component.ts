import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../../book';
import { DbService } from '../../../db.service';

@Component({
  standalone: true,
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  imports: [CommonModule],
  providers: [DbService],
})
export class DeleteComponent implements OnInit {
  @Input() page!: string;
  @Input() foundBook!: Book;
  @Output() pageChange = new EventEmitter<string>();

  delete() {
    this.db.deleteBook(this.foundBook).subscribe();
    this.goTo('home');
  }

  goTo(page: string) {
    this.page = page;
    this.pageChange.emit(this.page);
  }
  constructor(private db: DbService) {}
  ngOnInit() {}
}
