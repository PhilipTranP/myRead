import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import createHistory from 'history/createBrowserHistory'
import { Link } from 'react-router-dom'
import Book from './Book'
import './BookSearchPage.css'

export default class BookSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      option: '',
      query: '',
      books: [],
      error:'',
      updatedBooks: [],
      searchResults: []
    }
  }
  componentDidMount(){
    this.nameInput.focus() // TODO: show placeholder when not in focus mode.
    this.setState({books: this.props.books, query: this.props.query})
    this.searchBook(this.props.query)
  }
  componentWillReceiveProps(){
    this.setState({option: "none", query: this.state.query})
    this.searchBook(this.state.query)
  }
  onInputChange(query){
    this.setState({query})
  }
  handleSubmit(event, query) {
    const history = createHistory()
    history.push({
    pathname: `/search/${this.state.query}`,
    })
    window.location.reload()
  }
  searchBook(query) {
    var term = query.trim()
    this.setState({query: term})
    if(!term) {
      this.setState({searchResults: []})
      return
    }
    this.props.query && BooksAPI.search(this.state.query)
    .then(result => {
      // If BooksApi returns anything other than array throw error and skip state updates
      if(!Array.isArray(result)) {
        throw new Error('Bad response')
      }
      return result
    })
    .then(result =>
      result.map(newBook => {
        if(this.props.books.filter(book => book.id === newBook.id).length) {
          var filteredBook = this.props.books.filter(book => book.id === newBook.id)// Pull out the book already in one of the shelves. Result is an one item array.
          newBook.shelf = filteredBook[0].shelf; // Assign shelf property to the newBook which is currently 'none' or a hard-coded shelf property.
        } else if(newBook.shelf !== 'none') {  // If the shelf property is hard-coded by the Audacity folks, reset it to 'none' ;-)
          newBook.shelf = 'none'
        }
        return newBook
      }))
    .then(result => {
      this.setState({searchResults: result})  // Add books to searchResults book array
    })
    .catch(e => {
      this.setState({error: 'Failed to load resources'})
    })
  }

  renderSearchResults(){
    if(this.state.searchResults.length > 0 ){
      return(
        this.state.searchResults.map((book, i) => {
             return(<Book key={book.id + i}    updateBooksInShelf={this.props.updateBooksInShelf}
             book={book} query={this.props.query}/>
           )
         })
      )
    } else {
      return (
        <div style={{margin: "100px"}}>
          <h1 style={{fontWeight: "300"}}> No books found for <span>  "{this.props.query}" --- <a href="http://localhost:3000/search"> Suggest Keywords</a></span></h1>
        </div>
      )
    }
  }
  render() {
      return(
        <div className="search-books">
          <div className="search-books-bar">
            <div style={{margin: "14px"}}><Link to="/" className="to-home" >Home</Link></div>
             <div className="close-search" onClick={()=> createHistory().go(-1)}>Close</div>
              <div className="search-books-input-wrapper">
                <form onSubmit={(event, query) => this.handleSubmit(event, event.target.value)}>
                  <input
                    ref={(input) => { this.nameInput = input; }}
                    className="search-books"
                    type="text"
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={(event) => this.onInputChange(event.target.value)}
                  />
                </form>
              </div>
            </div>
        <div>
        </div>
         <div style={{marginTop: "80px"}}>
           <ol className="books-grid">
             {this.renderSearchResults()}
           </ol>
         </div>
       </div>
      )
    }
}
