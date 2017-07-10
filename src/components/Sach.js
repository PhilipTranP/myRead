import React, { Component } from 'react'

export default class Sach extends Component {
  state = {
    option: ''
  }
  onSelect(id, option){
    this.props.updateBooksInShelf(id, option)
    this.setState({option: "none"})
  }
  render(){
    const { book } = this.props
    return(
        <li key={book.id}>
         <div className="book">
           <div className="book-top">
             <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
             <div className="book-shelf-changer">
               <select value={this.state.option} onChange={ (event) => { this.onSelect({id: book.id}, event.target.value)} }>
                 <option value="none" disabled>Move to...</option>
                 <option value="currentlyReading">Currently Reading</option>
                 <option value="wantToRead">Want to Read</option>
                 <option value="read">Read</option>
                 <option value="none">None</option>
               </select>
             </div>
           </div>
           <div className="book-title">{book.title}</div>
           <div className="book-authors">{book.authors.join(', ')}</div>
         </div>
       </li>
     )
    }
  }
