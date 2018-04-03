"use strict"
import {combineReducers} from 'redux';
import {sentenceReducers} from './sentenceReducers';

export default combineReducers({
	sentences : sentenceReducers
});