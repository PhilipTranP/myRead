import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import BookShelfHeader from './BookShelfHeader'
import sortBy from 'sort-by'

export default class BookShelf extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      showNotifIfNoBooksFound: false,
    }
  }

  componentDidMount(){
    this.setState({books: this.props.books})
  }
  filterBookInShelf(query, shelf){
    this.setState({query})
  }

  render(){
    const { books } = this.props
    const { query } = this.state

    let showingBooks, showNotifs
    if (query) {
       const match = new RegExp(escapeRegExp(query), 'i')
       showingBooks = books.filter((book) => match.test(book.title))
     } else {
       showingBooks = books
     }

    showingBooks.sort(sortBy('title'))
    return(
      <div className="bookshelf">
        <BookShelfHeader  title={this.props.title} filterBookInShelf={(query, shelf)=> this.filterBookInShelf(query, shelf)}/>

        <div className="bookshelf-books">
          { this.state.query
            ? <div><Link to={`/search/${this.state.query}`}><p style={{marginBottom: "50px"}}>Search <strong>{this.state.query}</strong> to add books into the shelf.</p></Link></div>
            : null
          }
          <ol className="books-grid">
           { showingBooks.map((book)=>{
               return <Book key={book.id} book={book} updateBooksInShelf={this.props.updateBooksInShelf} />
             })
           }
          </ol>
        </div>

      </div>
    )
  }
}
