import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import App from './App';
import store from '@store';

const render = (App) => {
  ReactDOM.render(
    <StoreProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>,
    document.getElementById('root')
  );
};

render(App);

// Hot module reloading
if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App'));
    console.log('App updated successfully.');
  });
}