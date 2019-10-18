import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alerts } from './alerts.reducer';
import { alert } from './alert.reducer';
import { models } from './models.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alerts,
  alert,
  models,
});

export default rootReducer;
