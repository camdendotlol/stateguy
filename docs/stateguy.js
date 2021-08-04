/*
STATEGUY
A friendly guy who lives inside your browser and manages your state.
by Camden Mecklem, 2021
released under MIT license

Stateguy is a simple frameworkless state management system inspired by React-Redux.
You can tie DOM elements to state object properties by assigning a class name with the
"sg-" prefix. For example:

<span class="sg-city-population"></span>

This span element will display the value from ``state.city.population``. Stateguy will
automatically update the element each time the state updates.
*/

// State is stored in a private object that is not directly accessible from outside stateguy.js.
let state

// Initialize a state object
const init = (stateObject) => {
  if (state) {
    throw new Error('Trying to initialize state more than once.')
  }

  state = { ...stateObject }
  updateDOM()
}

const updateState = (name, payload) => {
  let newState = {}

  Object.keys(payload).forEach(key => {
    if (typeof payload[key] === 'object') {
      updateState(payload[key])
    } else {
      newState[key] = payload[key]
    }
  })

  state = { ...state, [name]: payload }
  updateDOM()
}

// Accepts an arbitrary number of string arguments.
// Traverses the state by using each arg as a property.
// e.g. fetch('developer') => { name: 'Camden', age: 24 }
//       fetch('developer', 'name') => 'Camden'
const fetch = (...properties) => {
  let item = state[properties[0]]

  if (properties.length > 1) {
    properties.slice(1).forEach(property => item = item[property])
  }

  return item
}

// Accepts an object and overwrites anything in state that matches it
const dispatch = (name, payload) => {
  if (state[name] === undefined) {
    throw new Error('Trying to dispatch to unknown state property. Make sure to add it to your init call first.')
  }

  updateState(name, payload)
}

const updateDOM = () => {
  const parseClassName = (className) => {
    // remove 'sg-' from the path
    const sgPath = className.slice(3).split(' ')

    // ignore unrelated classes
    const path = sgPath[0].split('-')

    const value = fetch(...path)

    if (typeof value === 'object') {
      throw new Error('Trying to pass an object to the DOM. Only datatypes that can be cast into a string can be displayed on the DOM.')
    }

    return fetch(...path)
  }

  const sgElements = document.querySelectorAll(`[class*=sg-`)
  sgElements.forEach(element => {
    return element.innerHTML = parseClassName(element.className)
  })
}

export default {
  init,
  fetch,
  dispatch
}