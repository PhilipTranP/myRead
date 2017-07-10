import React, { Component } from 'react'
import './ExpandSearchInput.css'


export default class ExpandSearchInput extends Component {
  constructor(props){
    super(props)
      this.state={
        query: ''
      }
  }

  onInputChange(query){
    this.setState({query})
    this.props.filterBookInShelf(query, this.props.shelf)
  }

  render() {
    return (
       <div>
          <div className="expand-search-input-wrapper">
              <input
                type="search"
                placeholder="search"
                value={this.state.query}
                onChange={(event) => this.onInputChange(event.target.value)}
              />
            </div>
      </div>
    )
  }
}
