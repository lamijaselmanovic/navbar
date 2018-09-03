import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {menuItems} from './config.js';

class SelectLanguage extends Component {
  render() {
    return (
      <select defaultValue="hr">
        <option key="hr" value="hr">HR</option>
        <option key="en" value="en">EN</option>
      </select>
    )
  }
}

function WordBreaker({title, breakAt = 3}) {
  return title && title.split(' ').map(word => word.length <= breakAt ? `${word} ` : <React.Fragment key={word}>{word}<br /></React.Fragment>)
}

class MenuItems extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <ul>
        {this.props.items.map(item => <li ref={item.ref} key={item.text}><WordBreaker title={item.text} /></li>)}
      </ul>
    )
  }
}

function prepareItems (items) {
  return items.map(item => ({
    text: item
  }))
}

class NavBar extends Component {
  constructor (props) {
    super(props)

    const defaultLanguage = 'hr'
    const items = props.items[defaultLanguage]

    this.state = {
      language: defaultLanguage,
      items: prepareItems(items)
    }
  }

  render () {
    return (
      <header className="App-header">
        <MenuItems items={this.state.items} />
        <SelectLanguage />
      </header>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar items={menuItems} />
      </div>
    );
  }
}

export default App;
