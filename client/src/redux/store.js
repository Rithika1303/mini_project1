import {applyMiddleware, combineReducers } from 'redux';
import { legacy_createStore as createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {carReducer} from './reducers/carReducer';
import {userReducer} from './reducers/userReducer';
import { alertsReducer} from './reducers/alertsReducer';
import { alertsReducer1} from './reducers/alertsReducer1';
import { alertsReducer2} from './reducers/alertsReducer2';
import { requestReducer } from './reducers/requestReducer';
import {bookingsReducer} from './reducers/bookingsReducer';
const composeEnhancers = composeWithDevTools({
});
const rootReducer = combineReducers({
  bookingsReducer,
  carReducer,
  alertsReducer,
  userReducer,
  alertsReducer1,
  requestReducer,
  alertsReducer2,
})
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store