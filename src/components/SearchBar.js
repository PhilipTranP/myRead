import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SearchBar extends Component {
  constructor(props){
    super(props)
      this.state={
        query: ''
      }
  }
  componentDidMount(){
    this.nameInput.focus() // to focus on the search bar. TODO: show placeholder when not in focus mode.
  }
  onInputChange(query){
    this.setState({query})
    this.props.onSearchQueryChange(query)
  }
  render(){
    return(
      <div className="search-books-bar">
        <Link to="/" className="close-search" >Close</Link>
        <div className="search-books-input-wrapper">
          <input
            ref={(input) => { this.nameInput = input; }}
            className="search-books"
            type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.onInputChange(event.target.value)}
          />
        </div>
      </div>
    )
  }
}
