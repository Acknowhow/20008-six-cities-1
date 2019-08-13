import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {BrowserRouter} from 'react-router-dom';

import {App} from './components/app/app';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';

import {createAPI} from './api';
import reducer from './reducers/reducer';
import {Operation as DataOperation} from './reducers/data/data';

import withActiveItem from './hocs/with-active-item/with-active-item';
import withTransformProps from './hocs/with-transform-props/with-transform-props';


const transformItemToOffer = (props) => {
  const newProps = Object.assign({}, props, {
    getActiveOffer: props.getActiveItem,
    activateOffer: props.activateItem,
    deactivateOffer: props.deactivateItem,
    isActiveOffer: props.isActiveItem
  });

  delete newProps.getActiveItem;
  delete newProps.activateItem;
  delete newProps.deactivateItem;
  delete newProps.isActiveItem;

  return newProps;
};

const AppWrapped = withActiveItem(
  withTransformProps(transformItemToOffer)(withScreenSwitch(App)));

export const api = createAPI();
export const store = createStore(
  reducer,

  compose(
    applyMiddleware(thunk.withExtraArgument(api))
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
