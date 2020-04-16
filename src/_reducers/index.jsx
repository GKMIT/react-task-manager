import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { loader } from './loader.reducer';
import { confirm } from './confirm.reducer';
import { fileUpload } from './file.reducer';
import crud from './crud.reducer';
import { reducerData } from './assign.reducer';

const reducers = {}
reducers['authentication'] = authentication
reducers['loader'] = loader
reducers['alert'] = alert
reducers['confirm'] = confirm
reducers['fileUpload'] = fileUpload

reducerData.forEach(element => {
    reducers[element] = crud(element)
});

const rootReducer = combineReducers(
    reducers
);

export default rootReducer;