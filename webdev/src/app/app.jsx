import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import appData from './reducers'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main'; // Our custom react component

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(<Main />, document.getElementById('app'));

/*
let store = createStore(appData)

let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
*/