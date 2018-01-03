import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'


import reducers from './reducers';
import GeneratedFormExample from '@containers/GeneratedFormExample'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <GeneratedFormExample />
      </Provider>
    )
  }
}

export default App;
