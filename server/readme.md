# Book Management API

Welcome to the Book Management API documentation! This API allows users to manage their accounts, books, and reviews seamlessly. Below you will find detailed information about the available endpoints.

## Table of Contents

- [Authentication](#authentication)
  - [Signup](#signup)
  - [Login](#login)
  - [Signout](#signout)
  - [Get User's Books](#get-users-books)
- [Books](#books)
  - [Create Book](#create-book)
  - [Update Book](#update-book)
  - [Delete Book](#delete-book)
  - [Get All Books](#get-all-books)
  - [Get Book by ID](#get-book-by-id)
  - [Search Books](#search-books)
  - [Recommend Books](#recommend-books)
- [Reviews](#reviews)
  - [Create Review](#create-review)
  - [Update Review](#update-review)
  - [Delete Review](#delete-review)
  - [Get Book Reviews and Average Rating](#get-book-reviews)

## Authentication

### Signup

```http
POST http://localhost:3000/api/auth/signup

Request Body:
json
{
    "name": "vibhu",
    "email": "abc@gmail.com",
    "password": "wefewr"
}

Login
text
POST http://localhost:3000/api/auth/login

Request Body:
json
{
    "email": "abc@gmail.com",
    "password": "wefewr"
}

Signout
text
GET http://localhost:3000/api/auth/signout

Get User's Books
text
GET http://localhost:3000/api/auth/1/books

Response Example:
json
{
    "success": true,
    "books": [
        {
            "id": 2,
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "isbn": "9780743273565",
            "genre": "Classic",
            "coverUrl": "https://res.cloudinary.com/dp4flnvvw/image/upload/v1732106516/fmxdrbrp9bfgzajaonwa.jpg",
            "ownerId": 1,
            "createdAt": "2024-11-20T12:41:57.791Z",
            "updatedAt": "2024-11-20T12:41:57.791Z",
            "reviews": [
                {
                    "id": 2,
                    "rating": 5,
                    "text": "An amazing book!",
                    "userId": 1,
                    "bookId": 2
                }
            ]
        },
        // Additional books...
    ]
}

Books
Create Book
text
POST http://localhost:3000/api/books

Request Body:
json
{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "9780743273565",
    "genre": "Classic",
    "coverUrl": "https://neon.tech/images/social-previews/pricing.jpg"
}

Update Book
text
PUT http://localhost:3000/api/books/1

Request Body:
json
{
    "title": "The Great Gatsby updated",
    "author": "F. Scott Fitzgerald",
    "isbn": "9780743273565",
    "genre": "Classic",
    "coverUrl": "https://neon.tech/images/social-previews/pricing.jpg"
}

Delete Book
text
DELETE http://localhost:3000/api/books/1

Get All Books
text
GET http://localhost:3000/api/books

Get Book by ID
text
GET http://localhost:3000/api/books/getbook/2

Search Books
text
GET http://localhost:3000/api/books/search?query=Gatsby

Recommend Books
text
GET http://localhost:3000/api/books/recommend/2

Reviews
Create Review
text
POST http://localhost:3000/api/reviews/books/2/reviews

Request Body:
json
{
    "rating": 5,
    "text": "An amazing book!"
}

Update Review
text
PUT http://localhost:3000/api/reviews/reviews/1

Request Body:
json
{
    "rating": 4,
    "text": "Updated review: The pacing could have been better."
}

Delete Review
text
DELETE http://localhost:3000/api/reviews/reviews/1

Get Book Reviews and Average Rating
text
GET http://localhost:3000/api/reviews/books/2/reviews
```
