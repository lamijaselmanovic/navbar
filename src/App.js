import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {menuItems} from './config';


class SelectLangage extends Component {
  render() {
    return (
      <select defaultValue={this.props.value} onChange={(e) => this.props.onChange(e.target.value)}>
        <option key='hr' value="hr">Hrvatski</option>
        <option key='en' value="en">English</option>
      </select>
    )
  }
}

function WordBreaker({title, breakAt = 3}) {
  return title && title.split(' ').map(word => word.length <= breakAt ? `${word} ` : <React.Fragment key={word}>{word}<br /></React.Fragment>)
}

class MenuItems extends Component {
  render() {
    return (
      <ul id="menu-items">
        {this.props.items.filter(({ shown }) => shown).map(item => (
          <li ref={item.ref} key={item.text}>
            <WordBreaker title={item.text} />
          </li>
        ))}
        <li>
          ...
          <ul id="more" className="hidden">
            {this.props.items.filter(({ shown }) => !shown).map(item => (
              <li key={item.text}>
                <WordBreaker title={item.text} />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    )
  }
}

function removeExcessItems(screenWidth, items, cutOff) {
  const cutOffItems = items.slice(0, cutOff)
  const sumOfWidths = cutOffItems.reduce((widthSum, { width }) => widthSum + width,0)
  if (sumOfWidths < screenWidth) {
    return { cutOffItems, cutOff }
  }
  return removeExcessItems(screenWidth, items, cutOff ? cutOff - 1 : -1)
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
    // 130 of select language - fix this..
    const screenWidth = event.target.outerWidth - 130;

    let sumOfWidths = 0

    const items = this.state.items.map(function(item) {
      const width = item.ref.current ? item.ref.current.offsetWidth : item.width
      sumOfWidths += width
      return {
        ...item,
        width,
        shown: sumOfWidths < screenWidth
      }
    })

    this.setState({
      items
    })
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
    )
  }
}


export default App;