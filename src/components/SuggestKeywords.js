import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import createHistory from 'history/createBrowserHistory'
import { Link } from 'react-router-dom'
import './BookSearchPage.css'

let keyWords = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

export default class SuggestKeywords extends Component {
  constructor(props) {
    super(props);
    this.state={
      query: '',
      allowWords: keyWords
    }
  }
  componentDidMount(){
    this.nameInput.focus() // TODO: show placeholder when not in focus mode.
  }
  onInputChange(query){
    this.setState({query})
    if(!query){
      this.setState({allowWords: keyWords})
      return
    }
    const match = new RegExp(escapeRegExp(this.state.query), 'i')
    const filteredAllowWords = this.state.allowWords.filter((word) => match.test(word))
    this.setState({allowWords: filteredAllowWords})
  }
  handleSubmit(event, query) {
    const history = createHistory()
    history.push({
    pathname: `search/${this.state.query}`,
    })
    window.location.reload()
  }
  handleAllowWordsClick(word) {
    const history = createHistory()
    history.push({
    pathname: `search/${word}`,
    })
    window.location.reload()
  }
  render() {
    return (
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
        <div style={{margin: '70px'}}>
          <h2>Suggest Keywords</h2>
          <div className="tags">
            <ul>
              {this.state.allowWords.map((word, i)=>{
               return (
                  <li key={i}><a onClick={() => this.handleAllowWordsClick(word)}>{word}</a></li>
               )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
