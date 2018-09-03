import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {menuItems} from './config';


class SelectLangage extends Component {
  render() {
    return (
      <select defaultValue={this.props.value} onChange={(e) => this.props.onChange(e.target.value)}>
        <option key='hr' value="hr">HR</option>
        <option key='en' value="en">EN</option>
      </select>
    )
  }
}

function WordBreaker({title, breakAt = 3}) {
  return title && title.split(' ').map(word => word.length <= breakAt ? `${word} ` : <React.Fragment key={word}>{word}<br /></React.Fragment>)
}

class ShowMore extends Component {
  render() {
    return (
      <ul id="more">
        <li>{menuItems.hr[1]}</li>
        <li>{menuItems.hr[2]}</li>
      </ul>
    )
  }
}

class MenuItems extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <ul id="menu-items">
        {this.props.items.map(item => <li ref={item.ref} key={item.text}><WordBreaker title={item.text} /></li>)}
        <li>...
          <ShowMore />
        </li>
      </ul>
    )
  }
}

function prepareItems (items) {
  return items.map(item => ({
    text: item,
    width: 0,
    shown: true,
    ref: React.createRef()
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

    this.onWindowResize = this.onWindowResize.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      this.setState({
        items: prepareItems(this.props.items[this.state.language])
      })
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize (event) {
    console.warn('window resized', event.target.outerWidth)

    const sumOfAllWidths = this.state.items.reduce((sum, item) => sum + item.width, 0)


    const difference = event.target.outerWidth - sumOfAllWidths

    
    const items = this.state.items.map(function(item) {
      return {
        ...item,
        width: item.ref.current.offsetWidth
      }
    }).filter(function(item) {
      if (item.width >= difference) return false
      return true
    })

    this.setState({items: items})
  }

  render () {
    return (
      <header className="App-header">
        <MenuItems items={this.state.items} />
        <SelectLangage onChange={language => this.setState({language})} />
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