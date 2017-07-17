import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import SearchBar from './SearchBar'
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
  componentWillReceiveProps(){
    this.setState({option: "none", query: this.props.query})
    this.searchBook(this.props.query)
  }

  searchBook(query) {
    var term = query.trim()
    this.setState({query: term})
    if(!term) {
      this.setState({searchResults: []})
      return
    }
    term && BooksAPI.search(this.state.query)
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
    const allowWords = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    if(this.state.searchResults.length > 0 ){
      return(
        this.state.searchResults.map((book, i) => {
             return(<Book key={book.id + i}    updateBooksInShelf={this.props.updateBooksInShelf}
             book={book} query={this.props.query}/>
           )
         })
      )
    } else {
      return(
        <div style={{margin: "50px"}}>
          {/* Notes: Some keywords suggested by Udacity provides no search results.*/}

            { this.props.query === "suggest-keywords" || this.state.query === ''
              ?
                null

              :
                <div>Hmm... seems like the Audacity folks rented out these books!</div>
             }
            <h2>Suggest Keywords</h2>
            <div className="tags">
              <ul>
                {allowWords.map((word, i)=>{
                 return (
                    <li key={i}><a href={`http://localhost:3000/search/${word}`}>{word}</a></li>
                 )
                })}
              </ul>
            </div>
         </div>
     )
    }
  }
  render() {
      return(
        <div className="search-books">
          <SearchBar
            onSearchQueryChange={(query) => this.searchBook(query)}
          />
        <div>
        </div>
         <div style={{marginTop: "80px"}}>

           { this.props.query === "suggest-keywords" || this.state.searchResults.length < 1
             ?
               null

             :
               <h3 style={{marginLeft: "30px"}}><a href="http://localhost:3000/search/suggest-keywords"> Suggest Keywords</a></h3>
            }

           <ol className="books-grid">
             {this.renderSearchResults()}
           </ol>
         </div>
       </div>
      )
    }
}
