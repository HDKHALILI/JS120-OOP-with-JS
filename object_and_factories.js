function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      let description = `${this.title} was written by ${this.author}.`;
      let hasRead = `I ${this.read ? "have" : "haven't"} read it`;
      console.log(`${description} ${hasRead}`);
    },

    readBook() {
      this.read = true;
    }
  }
}

let book1 = createBook("Mythos", "Stephen Fry");
let book2 = createBook("Me Talk Pretty One Day", "David Sedaris");
let book3 = createBook("Aunts arent't Gentlemen", "PG Wodehouse");

book1.getDescription();
book1.readBook();
book1.getDescription();
// book2.getDescription();
// book3.getDescription();