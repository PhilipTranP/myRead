import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import BookShelfHeader from './BookShelfHeader'

export default class BookShelf extends Component {
  state = {
    books: [],
    sortedBooks: [],
    query: '',
    showNotifIfNoBooksFound: false,
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: []
  }
  componentDidMount(){
    this.setState({books: this.props.books})
    this.props.sortBooks()
  }
  filterBookInShelf(query, shelf){
    const match = new RegExp(escapeRegExp(query), 'i')
    this.setState({query})
    if(shelf===0){
      this.setState({books: this.state.currentlyReadingBooks})
    } else if(shelf===1){
      this.setState({books: this.state.wantToReadBooks})
    } else if(shelf===2){
      this.setState({books: this.state.readBooks})
    }
    const filteredBooks = this.state.books.filter((book) => match.test(book.title))
    if(!query || filteredBooks.length < 1 ){
      this.setState({books: this.state.sortedBooks[shelf], showNotifIfNoBooksFound: !this.state.showNotifIfNoBooksFound})
    } else {
      this.setState({books: filteredBooks})
    }
  }
  render(){
    return(
      <div className="bookshelf">
        <BookShelfHeader  title={this.props.title} filterBookInShelf={(query, shelf)=> this.filterBookInShelf(query, shelf)}/>

        <div className="bookshelf-books">
          { this.state.showNotifIfNoBooksFound
            ? <div><Link to={`/search/${this.state.query}`}><p style={{marginBottom: "50px"}}>Search <strong>{this.state.query}</strong> to add books into the shelf.</p></Link></div>
            : null
          }
          <ol className="books-grid">
           { this.state.books.map((book)=>{
               return <Book key={book.id} book={book} updateBooksInShelf={this.props.updateBooksInShelf} />
             })
           }
          </ol>
        </div>

      </div>
    )
  }
}
