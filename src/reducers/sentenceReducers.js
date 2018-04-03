"use strict";
var sentences = [
   "What we think we become",
   "This is Bhasha App.",
   "Out of difficulties grow miracles",
   "Use time properly",
   "Life is a bitch." 
];
//SENTENCE REDUCERS
export function sentenceReducers (state={sentences: sentences,
    selectedSentence:[], randomWords:[],answerWords:[] },action){
	switch(action.type){
		case "GET_SENTENCES":
		    return state;
		    break;
		case "GET_SENTENCE":
		    return {...state, selectedSentence: state.sentences[action.payload]};
		    break;
		case "GET_RANDOM_WORDS":

			function getRandomNumber(min, max) {
			  min = Math.ceil(min);
			  max = Math.floor(max);
			  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
			}

			function getRang(arr){
			  var max = arr.length-1;
			  var nums=[]
			  
			  var randNum;
			  while(nums.length != arr.length){
			    randNum = getRandomNumber(0,max)
			    //console.log(randNum)
			    if(nums.indexOf(randNum) === -1){
			       nums.push(randNum)
			     }
			  }
			  return nums;
			}

			console.log("sentence", state.sentences[action.payload])
			var sentence=state.sentences[action.payload];
			var str=sentence.split(".")[0].split(" ");
			console.log(str)

			var randStr=[];
			var positions = getRang(str)
			console.log(positions)
			for(var i=0;i<positions.length;i++){
			 randStr.push(str[positions[i]])
			}
			console.log(randStr)

		    return {...state, randomWords: randStr, answerWords:[] }; 
		    break;

		case "SELECT_OPTION_WORD":
		     var wordIndex= state.randomWords.indexOf(action.payload);
		     var newRandomWords= [...state.randomWords.slice(0,wordIndex),
		                          ...state.randomWords.slice(wordIndex +1) ]

		    return {...state, randomWords: newRandomWords,
		                      answerWords: state.answerWords.concat(action.payload)};
		    break; 
		case "SELECT_OPTION_WORD":
		     var wordIndex= state.randomWords.indexOf(action.payload);
		     var newRandomWords= [...state.randomWords.slice(0,wordIndex),
		                          ...state.randomWords.slice(wordIndex +1) ]

		    return {...state, randomWords: newRandomWords,
		                      answerWords: state.answerWords.concat(action.payload)};
		    break;  
		case "ClOSE_LESSON":
		    return {...state, randomWords: [], answerWords: [], selectedSentence:[] 
		            };
		    break;         
	}
	return state;
}