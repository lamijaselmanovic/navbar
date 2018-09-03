import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const menuItems = {
  hr: [
    "Ljepota i Vi",
    "Kuhanje na zdrav način",
    "Kampiranje na otvorenom",
    "Aktivirajte se",
    "Meditacija",
    "2 + 2 = 3",
    "Za filmofile i knjigoljupce",
    "Jučer danas sutra"
  ],
  en: [
    "Beauty and You",
    "Healthy Cooking",
    "Outdoor Camping",
    "Activate",
    "Meditation",
    "2 + 2 = 3",
    "Cinephiles' and Booklovers' Corner",
    "Yesterday Today Tomorrow"
  ]
};

class NavBar extends Component {
  render() {
    return (
      <header className="App-header">
        <ul>
          <li>Test</li>
        </ul>
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
