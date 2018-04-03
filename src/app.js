import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
//IMPORT COMBINED REDUCERS
import reducers from './reducers/index';
//IMPORT ACTIONS 

import {getSentences, getSentence} from './actions/sentenceActions';
//MIDDLEWARE
const middleware =applyMiddleware(logger);

//STORE
const store =createStore(reducers, middleware);

/////////////// REACT APP/////////////////

import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import MainGrid from './components/MainGrid';

ReactDom.render(
	<Provider store={store}>
	   <MainGrid />
    </ Provider>	, document.getElementById('app'));