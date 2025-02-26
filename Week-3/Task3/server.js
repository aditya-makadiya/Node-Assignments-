// - Create `server.js` file in that you create http server using node js ‘http’ module.
// - Read about REST APIs. GET, POST, PUT, DELETE. There are PATCH and TRACE but not mostly used so you can read brief about it.
// - Create one JSON array of object which is containing books.
// - Implement GET, POST, PUT, DELETE basically CRUD APIs using built in http module only and use the file system as persistence data storage and to store JSON that you created in last step.
// 1. Get all the books.
// 2. Get a book by id.
// 3. Create a book.
// 4. Modify a book.
// 5. Delete a book.

const fs = require('fs').promises;
const path = require('path');
const http = require('http');

const PORT = 3000;
const filePath = path.join(__dirname, 'Data.json');

async function getBooks() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
}

async function saveBooks(books) {
    try {
        await fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

const server = http.createServer(async (req, res) => {
    try {
        
        if (req.method === 'GET' && req.url === '/books') {
            const books = await getBooks();
            //console.log(books);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(books));
        }

        if(req.method === "GET" && req.url.startsWith("/books/")){
          const id = req.url.split("/").pop();
          const books = await getBooks();
          const book = books.find(b => b.id === id);
          res.writeHead(book ? 200 : 404, { "Content-Type": "application/json" });
          return book ? res.end(JSON.stringify(book)) : res.end(JSON.stringify({message : "Book Not Found"}));
        } 

        if (req.method === "PUT" && req.url.startsWith("/books/update/")) {
          let body = "";
          req.on("data", chunk => {
             body += chunk;
             console.log("Received chunk:", chunk.toString());
            });

          req.on("end", async () => {
             try {
              if (!body.trim()) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Empty request body" }));
                return;
              }
            
              const updatedBook = JSON.parse(body); 
              const id = req.url.split("/").pop();
              let books = await getBooks();
              const index = books.findIndex(b => b.id === id);
            
              if (index === -1) {
                  res.writeHead(404, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ message: "Book Not Found" }));
                  return;
              }
            
              books[index] = { ...books[index], ...updatedBook };
              await saveBooks(books);

              res.writeHead(200, { "Content-Type": "application/json" });   
              res.end(JSON.stringify(books[index]));  
              return;
            
              }catch (error) {
                console.error("PUT request error:", error);
              
                if (!res.headersSent) {  
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Invalid JSON input", details: error.message }));
                    return;
                    //return res.end(JSON.stringify({ error: "Invalid JSON format", details: error.message }));
                }
              }
          });   
          req.on("error", (error) => {
                console.error("Request error:", error);   
                if (!res.headersSent) {  
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Internal server error" }));
                }
          });
        }

        if (req.method === "POST" && req.url === "/books/add"){
          let body = "";
          req.on("data", chunk => { body += chunk; });
          req.on("end", async () => {
            try {
              if (!body.trim()) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Empty request body" }));
              }
              const newBook = JSON.parse(body);
              let books = await getBooks();
              books.push(newBook);
              await saveBooks(books);
              res.writeHead(200,{"content-type": "application/json"});
              return res.end(JSON.stringify(newBook)); 

            }
            catch(error){
              console.error("POST request error :",error);
            }
          })
        }

        
        else {
            res.end(JSON.stringify({ error: 'Route not found' }));
        }
       } catch (error) {
        console.error('Server error:', error);
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


server.on('error', (error) => {
    console.error('Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use`);
    }
});

// const fs = require('fs').promises;
// const path = require('path');
// const http = require('http');

// const PORT = 3000;
// const filePath = path.join(__dirname, 'Data.json');

// // Helper function to parse request body
// const getRequestBody = async (req) => {
//     return new Promise((resolve, reject) => {
//         let body = '';
//         req.on('data', chunk => { body += chunk; });
//         req.on('end', () => resolve(body));
//         req.on('error', reject);
//     });
// };

// // Helper function to send JSON response
// const sendResponse = (res, statusCode, data) => {
//     res.writeHead(statusCode, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(data));
// };

// async function getBooks() {
//     try {
//         const data = await fs.readFile(filePath, 'utf-8');
//         return JSON.parse(data);
//     } catch (error) {
//         if (error.code === 'ENOENT') {
//             // If file doesn't exist, create it with empty array
//             await saveBooks([]);
//             return [];
//         }
//         throw error;
//     }
// }

// async function saveBooks(books) {
//     try {
//         await fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8');
//     } catch (error) {
//         throw new Error(`Failed to save books: ${error.message}`);
//     }
// }

// const server = http.createServer(async (req, res) => {
//     // Set CORS headers
//     // res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     // Handle OPTIONS requests
//     if (req.method === 'OPTIONS') {
//         return sendResponse(res, 204);
//     }

//     try {
//         const urlParts = req.url.split('/').filter(Boolean);

//         // GET all books
//         if (req.method === 'GET' && req.url === '/books') {
//             const books = await getBooks();
//             return sendResponse(res, 200, books);
//         }

//         // GET book by id
//         if (req.method === 'GET' && urlParts[0] === 'books' && urlParts.length === 2) {
//             const id = urlParts[1];
//             const books = await getBooks();
//             const book = books.find(b => b.id === id);
            
//             if (!book) {
//                 return sendResponse(res, 404, { error: 'Book not found' });
//             }
//             return sendResponse(res, 200, book);
//         }

//         // POST new book
//         if (req.method === 'POST' && req.url === '/books') {
//             const body = await getRequestBody(req);
            
//             if (!body.trim()) {
//                 return sendResponse(res, 400, { error: 'Empty request body' });
//             }

//             try {
//                 const newBook = JSON.parse(body);
                
//                 // Validate required fields
//                 if (!newBook.id || !newBook.title) {
//                     return sendResponse(res, 400, { error: 'Book must have id and title' });
//                 }

//                 const books = await getBooks();
                
//                 // Check for duplicate ID
//                 if (books.some(book => book.id === newBook.id)) {
//                     return sendResponse(res, 409, { error: 'Book with this ID already exists' });
//                 }

//                 books.push(newBook);
//                 await saveBooks(books);
//                 return sendResponse(res, 201, newBook);
//             } catch (error) {
//                 return sendResponse(res, 400, { error: 'Invalid JSON format' });
//             }
//         }

//         // PUT update book
//         if (req.method === "PUT" && req.url.startsWith("/books/")) {
//             const id = urlParts[1];
//             const body = await getRequestBody(req);
            
//             if (!body.trim()) {
//                 return sendResponse(res, 400, { error: 'Empty request body' });
//             }

//             try {
//                 const updatedBook = JSON.parse(body);
//                 const books = await getBooks();
//                 const index = books.findIndex(b => b.id === id);

//                 if (index === -1) {
//                     return sendResponse(res, 404, { error: 'Book not found' });
//                 }

//                 books[index] = { ...books[index], ...updatedBook, id }; // Preserve original ID
//                 await saveBooks(books);
//                 return sendResponse(res, 200, books[index]);
//             } catch (error) {
//                 return sendResponse(res, 400, { error: 'Invalid JSON format' });
//             }
//         }

//         // DELETE book
//         if (req.method === "DELETE" && req.url.startsWith("/books/delete/")) {
//             const id = req.url.split('/').pop();
//             const books = await getBooks();
//             const initialLength = books.length;
            
//             const filteredBooks = books.filter(book => book.id !== id);
            
//             if (filteredBooks.length === initialLength) {
//                 return sendResponse(res, 404, { error: 'Book not found' });
//             }

//             await saveBooks(filteredBooks);
//             return sendResponse(res, 200, { message: 'Book deleted successfully' });
//         }

//         // Handle unknown routes
//         return sendResponse(res, 404, { error: 'Route not found' });

//     } catch (error) {
//         console.error('Server error:', error);
//         return sendResponse(res, 500, { error: 'Internal server error' });
//     }
// });

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// server.on('error', (error) => {
//     console.error('Server error:', error);
//     if (error.code === 'EADDRINUSE') {
//         console.log(`Port ${PORT} is already in use`);
//     }
// });