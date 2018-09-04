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

// class ShowMore extends Component {
//   render() {
//     return (
//       <ul id="more">
//         <li>{menuItems.hr[1]}</li>
//         <li>{menuItems.hr[2]}</li>
//       </ul>
//     )
//   }
// }

// {this.props.hiddenArray.map(item => <li key={item.text}><WordBreaker title={item.text} />Lamija</li>)}

class MenuItems extends Component {
  render() {
    return (
      <ul id="menu-items">
        {this.props.items.map(item => <li ref={item.ref} key={item.text}><WordBreaker title={item.text} /></li>)}
        <li>...
          <ul id="more">
            {this.props.hiddenArray.map(item => <li key={item.text}><WordBreaker title={item.text} /></li>)}
          </ul>
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
    const hiddenArray = []
    const shownArray = []

    this.state = {
      language: defaultLanguage,
      items: prepareItems(items),
      hiddenArray: hiddenArray,
      shownArray: shownArray
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
    // console.warn('window resized', event.target.outerWidth)

    const sumOfAllWidths = this.state.items.reduce((sum, item) => sum + item.width, 0)

    // console.warn('sum of all', sumOfAllWidths)
    // console.warn('razlika', event.target.outerWidth - sumOfAllWidths)

    // 100 od selecta
    const difference = event.target.outerWidth - sumOfAllWidths + 100
    
    const items = this.state.items.map(function(item) {
      return {
        ...item,
        width: item.ref.current.offsetWidth
      }
    })

    const hiddenArray = this.state.hiddenArray
    const shownArray = items
    
    // const screenWidth = 400;
    // 130 of select language - fix this..
    const screenWidth = event.target.outerWidth - 130;

    const removeExcessItems = (items, cutOff) => {
      const cutOffItems = items.slice(0, cutOff)
      const sumOfWidths = cutOffItems.reduce((widthSum, {width}) => widthSum + width, 0)
      if (sumOfWidths < screenWidth) {
        return cutOffItems
      }
      else {
        hiddenArray.push(items[items.length-1])
        shownArray.slice(items[items.length-1])
        // console.log(hiddenArray);
        // console.log(shownArray);
        // console.log(items.length)
        return removeExcessItems(items, cutOff ? cutOff - 1 : -1)
      }
    }

    this.setState({items: removeExcessItems(items)})
    this.setState({hiddenArray: hiddenArray})
    this.setState({shownArray: shownArray})
  }

  render () {
    return (
      <header className="App-header">
        <MenuItems items={this.state.items} hiddenArray={this.state.hiddenArray}/>
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