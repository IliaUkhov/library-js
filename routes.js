const express = require("express");

const router = express.Router();

router.get("/books", (req, res) => {
  console.log(`GET books`);
  res.render("book-page", { books: books });
});

router.get("/ajax/books", (req, res) => {
  let filtered = global.books;
  console.log(`Filter books`);
  if (Object.keys(req.query).length > 0) {
    if (req.query.startDate && req.query.endDate) {
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);
      filtered = filtered.filter(a => {
        const date = new Date(a.reader.due);
        return date >= startDate && date <= endDate;
      });
    }
    if (req.query.show) {
      if (req.query.show === "available") {
        filtered = filtered.filter(a => {
          return !a.reader.given;
        });
      } else if (req.query.show === "given") {
        filtered = filtered.filter(a => {
          return a.reader.given;
        });
      }
    }
    res.render("books", { books: filtered });
  }
});

router.get("/books/new", (req, res) => {
  console.log(`GET new book`);
  res.render("book-new");
});

router.post("/books/new", (req, res) => {
  console.log(`POST New book ${books.length}: ${JSON.stringify(req.body)}`);
  books.push({ ...req.body, id: books.length, reader: { given: false } });
  res.status(200).send("OK");
});

router.get("/books/:num", (req, res, next) => {
  const id = req.params.num;
  console.log(`GET book ${id}`);
  res.render("book-view", { book: books[id] });
});

router.post("/books/:num", (req, res) => {
  const id = req.params.num;
  console.log(`POST Edit book ${id}: ${JSON.stringify(req.body)}`);
  books[id] = { ...books[id], ...req.body };
  res.status(200).send("OK");
});

router.delete("/books/:num", (req, res, next) => {
  const id = req.params.num;
  console.log(`DELETE book ${id}`);
  books.splice(id, 1);
  res.status(200).send("OK");
});

module.exports = router;
