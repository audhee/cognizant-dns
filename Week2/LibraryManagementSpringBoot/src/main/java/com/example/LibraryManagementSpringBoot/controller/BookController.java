package com.example.LibraryManagementSpringBoot.controller;

import com.example.LibraryManagementSpringBoot.entity.Book;
import com.example.LibraryManagementSpringBoot.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookRepository repository;

    public BookController(BookRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return repository.save(book);
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id,
                           @RequestBody Book book) {

        book.setId(id);
        return repository.save(book);
    }

    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {

        repository.deleteById(id);
        return "Book Deleted Successfully";
    }
}