import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import Sach from './Sach'
import './BookSearchPage.css'

export default class BookSearchPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      option: '',
      query: '',
      books: [],
      updatedBooks: [],
      searchResults: []
    }
    this.searchBook(this.props.query)
  }
  componentDidMount(){
    this.setState({option: "none"})
    if(this.props.query.length >1){
      this.searchBook(this.props.query)
    }
  }

  searchBook(query){
    var term = query.trim()
    BooksAPI.search(term).then((results)=>{
      this.setState({query: term,
                     searchResults: results})
    })
  }

  renderSearchResults(){
    if(this.state.searchResults.length > 0 ){
      return(
        this.state.searchResults.map((book, i) => {
             return(<Sach key={book.id + i}    updateBooksInShelf={this.props.updateBooksInShelf}
             book={book} />
           )
         })
      )
    } else {
      return(
        <div style={{margin: "50px"}}>
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
      console.log(allowWords)
      return(
        <div className="search-books">
          <SearchBar
            onSearchQueryChange={(query) => this.searchBook(query)}
          />
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

const allowWords = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
