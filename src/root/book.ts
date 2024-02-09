export class Book {
  id: string;
  author: string;
  title: string;
  user: string;

  constructor(id: string, author: string, title: string, user: string) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.user = user;
  }
}
