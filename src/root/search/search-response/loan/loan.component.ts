import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../../book';
import { DbService } from '../../../db.service';

@Component({
  standalone: true,
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
  providers: [DbService],
})
export class LoanComponent implements OnInit {
  @Input() page!: string;
  @Input() foundBook!: Book;
  @Output() pageChange = new EventEmitter<string>();

  loan() {
    const user: HTMLInputElement = document.getElementById(
      'name'
    ) as HTMLInputElement;
    this.db.loanBook(this.foundBook, user.value).subscribe();
    this.goTo('home');
  }

  goTo(page: string) {
    this.page = page;
    this.pageChange.emit(this.page);
  }
  constructor(private db: DbService) {}
  ngOnInit() {}
}
