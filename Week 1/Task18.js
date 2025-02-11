// Create an object called book with properties title, author, and pages. Add a method called displayInfo to the object, which logs a message using the properties to display information about the book. Instantiate the object with sample values and call the displayInfo method.



let book = {
  title: "Atomic Habit",
  author: "James Clear",
  pages: 300,
  displayInfo: function() {
    console.log(`Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}`)
  }
}

book.displayInfo(); 
