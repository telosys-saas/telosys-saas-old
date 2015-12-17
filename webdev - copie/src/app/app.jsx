import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main'; // Our custom react component

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
//render(<Main />, document.getElementById('app'));

let initialState = {
  counter: 10,
  auth: {
    authenticated: false,
  },
}

let store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)