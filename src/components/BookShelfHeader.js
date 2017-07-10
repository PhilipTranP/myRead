import React, { Component } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import ExpandSearchInput from './ExpandSearchInput'

export default class BookShelfHeader extends Component {
  render() {
    const screen = window.innerWidth

    const displayCorrectTitle = (index) => {
      if (index === 0){
        return (screen > 460 ? "Currrently Reading" : "Reading")
      } else if (index === 1){
        return (screen > 460 ? "Want to Read" : "Want to")
      } else {
        return("Read")
      }
    }
    return(
      <div className="bookshelf-title-container">
         <VisibilitySensor offset={{top: 250}}>
            {({isVisible}) =>
              <h2 className="bookshelf-title-text">{displayCorrectTitle(this.props.title)} {!isVisible ? <div style={{display: "inline-block", marginLeft: "10px"}}><ExpandSearchInput filterBookInShelf={this.props.filterBookInShelf} shelf={this.props.title}/></div> : null}</h2>
            }
          </VisibilitySensor>
      </div>
    )
  }
}
