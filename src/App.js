import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {menuItems} from './config.js';

class MenuItems extends Component {
  render() {
    return (
      <ul>
        <li>{this.props.items[1]}</li>
        <li>{this.props.items[2]}</li>
      </ul>
    )
  }
}

class NavBar extends Component {
  render() {
    return (
      <header className="App-header">
        <MenuItems items={menuItems.hr}/>
      </header>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    );
  }
}

export default App;
