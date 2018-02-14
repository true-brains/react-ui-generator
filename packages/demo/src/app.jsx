import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';
import GeneratedFormExample from '@containers/GeneratedFormExample';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-12">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                  React UI Generator Demo
                </a>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col col-12">
              <GeneratedFormExample />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
