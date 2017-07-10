import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import FloatingPlusButton from './components/FloatingPlusButton'
// import BookShelf from './components/BookShelf'
import BookGrid from './components/BookGrid'
import BookShelfHeader from './components/BookShelfHeader'
import BookSearchPage from './components/BookSearchPage'
import * as BooksAPI from './BooksAPI'
import './App.css'

export default class HOME extends Component {

  state = {
  query: '',
  myBooks: '',
  sortedBooks: [],
  currentlyReadingBooks: [],
  wantToReadBooks: [],
  readBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({myBooks: books})
    })
  }

  onShelfSelect(bookId, shelf){
    BooksAPI.update(bookId, shelf).then((results) => {
      this.sortBooks()
    })
  }

  render() {
    const renderShelves = this.state.sortedBooks.map((books, i) => {
      return (
          <div className="bookshelf" key={i}>
            <BookGrid title={i} books={books} updateBooksInShelf={(bookId, shelf)=>this.onShelfSelect(bookId, shelf)} />
          </div>
        )
      })
    return (
      <div className="app">
          <Route exact path="/" render={() => (
             <div className="list-books">
               <div className="list-books-title">
                 <h1>MyReads</h1>
               </div>

               <div className="list-books-content">
                 { renderShelves }
               </div>

               <FloatingPlusButton  />
             </div>
           )} />

           <Route path='/search/:query' render={ (routeInfo) => (
             <BookSearchPage query={ routeInfo.match.params.query } updateBooksInShelf={(bookId, shelf)=>this.onShelfSelect(bookId, shelf)} />
            )} />
      </div>
    )
  }
  sortBooks(){
    BooksAPI.getAll().then((books) => {
      const filterBooks = (option) => {
        return books.filter((book) => option.test(book.shelf))
      }
      const sortedBooks =[]
      const read = new RegExp(escapeRegExp('read'), '')
      const readBooks = filterBooks(read)
      const wantToRead = new RegExp(escapeRegExp('wantToRead'), '')
      const wantToReadBooks = filterBooks(wantToRead)
      const currentlyReading = new RegExp(escapeRegExp('currentlyReading'), '')
      const currentlyReadingBooks = filterBooks(currentlyReading)
      sortedBooks.push(filterBooks(currentlyReading), filterBooks(wantToRead), filterBooks(read))
      this.setState({readBooks, currentlyReadingBooks, wantToReadBooks, sortedBooks})
    })
  }
}
