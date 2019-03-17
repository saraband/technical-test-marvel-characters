import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import ReduxThunk from 'redux-thunk';
import characters from './characters';

const rootReducer = combineReducers({
  characters
});

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);