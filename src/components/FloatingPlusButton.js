import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../App.css'

export default class FloatingPlusButton extends Component {
  render(){
    return(
      <div className="floating-plus-button">
        <Link to="/search/suggest-keywords" onClick={this.props.onClick}>Add a book</Link>
      </div>
    )
  }
}
