import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import FloatingPlusButton from './components/FloatingPlusButton'
import BookShelf from './components/BookShelf'
import BookSearchPage from './components/BookSearchPage'
import SuggestKeywords from './components/SuggestKeywords'
import * as BooksAPI from './BooksAPI'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      sortedBooks: []
    }
  }
  componentDidMount() {
     this.sortBooks()
  }

  onShelfSelect(bookId, shelf){
    BooksAPI.update(bookId, shelf).then((results) => {
      this.sortBooks() //to call getAll() API again to rerender the shelves
    })
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() => (
             <div className="list-books">
               <div className="list-books-title">
                 <h1>Philip Tran's MyReads</h1>
               </div>

               <div className="list-books-content">
                 {
                   this.state.sortedBooks.map((books, i) => {
                     return (
                         <div className="bookshelf" key={i}>
                           <BookShelf title={i} books={books} updateBooksInShelf={(bookId, shelf)=>this.onShelfSelect(bookId, shelf)} sortBooks={() => this.sortBooks()}/>
                         </div>
                       )
                     })
                 }
               </div>

               <FloatingPlusButton  />
             </div>
           )} />

         <Route exact path='/search' component={SuggestKeywords} />

           <Route path='/search/:query' render={ (routeInfo) => (
             <BookSearchPage query={ routeInfo.match.params.query }  books={this.state.books} updateBooksInShelf={(bookId, shelf)=>this.onShelfSelect(bookId, shelf)} />
          )} /> {/* To extract search keyword e.g. 'react' in the URL '.../search/react' in the BookSearchPage component use 'this.props.query'. Shout out to an UDACITY's @Jamesmanone in hacking this feature after studying the react-router's `match` */}
      </div>
    )
  }
  sortBooks(){ //TODO check with fellow devs to see if it can be simplified/DRYer!
    BooksAPI.getAll().then((books) => {
      this.setState({books})
      const filterBooks = (option) => {
        return books.filter((book) => option.test(book.shelf))
      }
      const sortedBooks =[] //result an array with three sub arrays for rendering three shelves using map.
      const read = new RegExp(escapeRegExp('read'), '') // 'i' would match 'read' wantToRead, currentlyReading.
      const wantToRead = new RegExp(escapeRegExp('wantToRead'), '')
      const currentlyReading = new RegExp(escapeRegExp('currentlyReading'), '')
      sortedBooks.push(filterBooks(currentlyReading), filterBooks(wantToRead), filterBooks(read))
      this.setState({sortedBooks})
    })
  }
}
