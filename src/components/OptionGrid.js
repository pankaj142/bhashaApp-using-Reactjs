//REACT REDUX MODULES
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//MATERIAL UI NEXT MODULES
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

//IMPORT ACTIONS
import {getRandomWords, selectOptionWord,closeLesson} from '../actions/sentenceActions';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    backgroundColor: "#c5d1e5",
    color: theme.palette.text.secondary
  },
  resultCorrect:{
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    backgroundColor: "green"
  },
  resultWrong:{
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    backgroundColor: "red"
  },
  congratutionsMsg:{
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    backgroundColor: "yellow"
  }
});

const gridStyle={
    marginTop:'10px',
    marginBottom:"10px"
} 

const hrStyle={
  marginTop:"20px",
  marginBottom:"20px"
}


class OptionGrid extends React.Component{
  constructor(props){
    super(props);
    this.state={
      randomWordsLocal:[],
      answerWordsLocal:[],
      showButtons:false,
      showResult:false,
      result:false,
      sentencePos:0,
      lessonFinishedMsg:false,
      errorMsg:false,
      totalCorrect:0
    }
  }

  componentDidMount(){
    this.props.getRandomWords({id:this.props.sentencePos});
    this.state.sentencePos =this.props.sentencePos;
  }

  //FUNCTION SHOWS RESULT
  checkAnswer(){
     var selectedSentence=this.props.sentences.selectedSentence.split(".")[0].split(" ")
     var answerWords= this.props.sentences.answerWords;
     var result= JSON.stringify(selectedSentence) == JSON.stringify(answerWords);
         //counting correct answers
         if(result){
          this.state.totalCorrect= this.state.totalCorrect +1;
         }
         this.state.showResult= true;
         this.state.result= result;
         this.state.errorMsg=false;
         this.forceUpdate();
     if(this.state.answerWordsLocal.length === 0){
         this.state.errorMsg=true;
     }    
     console.log("correct count",this.state.totalCorrect)
  }

  //FUNCTION HANDLES WORD SELECTION
  selectWord(word){
     this.props.selectOptionWord({word: word.i})
     this.state.answerWordsLocal = this.props.sentences.answerWords;
     this.state.errorMsg=false;
     //if the seleceted word is last
     if(this.state.randomWordsLocal.length === 1){
      this.state.showButtons=true;
     }
  }

  nextSentenceLocal(){
     if(this.state.sentencePos === this.props.sentences.sentences.length -1){
       console.log("Lesson Finished")
       this.state.lessonFinishedMsg=true;
       this.state.showResult=false;
       this.state.showButtons=false;
       this.props.closeLesson()
       this.forceUpdate();
     }else{
       this.props.nextSentence();
       this.state.showResult=false;
       this.state.result=false;
     }
  }

  render(){
      this.state.sentencePos =this.props.sentencePos;
      const { classes,sentences } = this.props;
      this.state.randomWordsLocal= sentences.randomWords;
      this.state.answerWordsLocal= sentences.answerWords;
      const {randomWordsLocal,answerWordsLocal} =this.state;

      const optionsWords=randomWordsLocal.map((i, j)=>{
        return(
          <Grid item xs={2} key={j}
             onClick={(e)=> this.selectWord({i},e)}>
                <Paper className={classes.paper}>
                  <strong >{i}</strong>
                </Paper>
          </Grid>
          )
      })

      const answerWords = answerWordsLocal.map((i,j)=>{
        return(
          <Grid item xs={2} key={j} >
                <Paper className={classes.paper}>
                  <strong >{i}</strong>
                </Paper>
          </Grid>
          )
      })

      const lessonMsg = 
        <div>
          <Grid container spacing={24} justify={'center'}>
              <Grid item xs={12} onClick={()=>this.checkAnswer()}>
                    <Paper className={classes.congratutionsMsg} >
                      <strong >Congratutions, you have completed Lesson!!!</strong>
                    </Paper>
              </Grid>
          </Grid>
          <Grid container spacing={24} justify={'center'}>
              <Grid item xs={12} onClick={()=>this.checkAnswer()}>
                    <Paper className={classes.congratutionsMsg} >
                      <strong >SCORE => {this.state.totalCorrect}/{this.props.sentences.sentences.length}</strong>
                    </Paper>
              </Grid>
          </Grid>    
        </div>

      const showOptionButtons =
          <Grid container spacing={24} justify={'center'}>
              <Grid   item xs={6} onClick={()=>this.checkAnswer()}>
                    <Paper className={classes.paper} >
                      <strong >Check Answer</strong>
                    </Paper>
              </Grid>
              <Grid item xs={6} onClick=
                  {()=>this.nextSentenceLocal()} >
                    <Paper className={classes.paper}>
                      <strong>Next Sentence</strong>
                    </Paper>
              </Grid>
          </Grid>

      const showResult = 
        <div>
          <hr/>
           <Grid container spacing={24} justify={'center'} >
              <Grid   item xs={12} >
                  {this.state.result ?   
                    <Paper className={classes.resultCorrect}>
                      <strong >CORRECT</strong>
                    </Paper>
                    : 
                    <Paper className={classes.resultWrong}>
                      <strong >WRONG</strong>
                    </Paper> 
                  }
              </Grid>
          </Grid>   
        </div>
          
      return (
        <div className={classes.root}>
         
         {/* ANSWER WORDS*/}
          <div style={gridStyle}>
              {this.state.answerWordsLocal.length !== 0?<h1>Answer</h1>:null}
               <Grid container spacing={24} >
                   {answerWords}
               </Grid>
               {this.state.answerWordsLocal.length !== 0?<hr style={hrStyle} />:null}
          </div>

          {/* OPTION WORDS*/}
          <div>
              {this.state.randomWordsLocal.length !== 0?<h1>Choose words</h1>:null}
              <Grid container spacing={24} >
                 {optionsWords}
              </Grid>
          </div>
          
          {this.state.randomWordsLocal.length !== 0 && this.state.showButtons?
                         <hr style={hrStyle} /> : null}

          {/*OPTIONS*/}               
          <div style={gridStyle}>
              {this.state.showButtons ? showOptionButtons : null}
          </div>

          {/*RESULT MESSAGE*/}
          <div style={gridStyle}>
              {this.state.showResult ? showResult: null}
          </div>
          {/*LESSON FINISH MESSAGE*/}
          {this.state.lessonFinishedMsg ? lessonMsg : null}

          {/*ERROR MESSAGE*/}
          {this.state.errorMsg ? <h3>First Choose options and then click on check answer button. </h3> : null}
            
        </div>
      );
  }
}

//redux state
function mapStateToProps(state){
  return {
    sentences : state.sentences
  }
}

//actions
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getRandomWords: getRandomWords,
    selectOptionWord: selectOptionWord,
    closeLesson: closeLesson
  },
  dispatch)
}

OptionGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OptionGrid));
