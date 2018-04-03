"use strict"

//POST BOOK
export function getSentences(){
	return {
		type: "GET_SENTENCES"
	}
}
export function getSentence(index){
	return {
		type: "GET_SENTENCE",
		payload: index.id
	}
}
export function getRandomWords(position){
	return {
		type: "GET_RANDOM_WORDS",
		payload:position.id
	}
}
export function selectOptionWord(word){
	return {
		type: "SELECT_OPTION_WORD",
		payload:word.word
	}
}


export function closeLesson(){
	return {
		type: "ClOSE_LESSON"
	}
}


