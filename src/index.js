import {createStore, applyMiddleware} from 'redux';
import {NameSpace} from './reducers/name-space';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {BrowserRouter, withRouter} from 'react-router-dom';

import App from './components/app/app.jsx';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch.js';
// import withRedirect from './hocs/with-redirect/with-redirect';

import {createAPI} from './api';
import reducer from './reducers/reducer';
import {Operation as DataOperation} from './reducers/data/data';
import {Operation as UserOperation} from './reducers/user/user';
import {ActionCreator} from "./reducers/user/user";


const AppWrapped = withRouter(withScreenSwitch(App));

const api = createAPI();

export const store = createStore(
  reducer,

  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

const init = () => {

  store.dispatch(DataOperation.loadCities());

  const body = document.getElementById(`root`).parentNode;

  ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <AppWrapped
            bodyElement={body}
          />
        </Provider>
      </BrowserRouter>,
      document.getElementById(`root`)
  );
};

init();
