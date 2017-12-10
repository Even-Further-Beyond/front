import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive';
import { createForms } from 'react-redux-form';

import ui from './ui';

import GraphQLClient from '../GraphQLClient';

const initialSearchState = {
  character: '',
  anime: '',
  voiceActor: '',
  genderId: '',
  hairColorId: '',
  eyeColorId: '',
  hairLengthId: '',
  apparentAgeId: '',
  tagIds: [],
};

const reducers = combineReducers({
  browser: responsiveStateReducer,
  apollo: GraphQLClient.reducer(),
  ...createForms({
    search: initialSearchState,
  }),
  ui,
});

export default reducers;
