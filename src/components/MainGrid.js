import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

//IMPORT ACTIONS
import {getSentence,getRandomWords} from '../actions/sentenceActions';

//IMPORT GRID FILES
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

//IMPORT COMPONENTS
import OptionGrid from './OptionGrid'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const sentenceStyle={
  color:"red"
}

class MainGrid extends React.Component{
  constructor(props){
    super(props);
    this.state={sentencePos : 0}
  }

  componentDidMount(){
    this.props.getSentence({id:this.state.sentencePos })
    console.log("MainGrid",this.props)
  }

  nextSentence(){
     this.state.sentencePos = this.state.sentencePos + 1;
     this.props.getRandomWords({id:this.state.sentencePos});
     this.props.getSentence({id:this.state.sentencePos})
     this.forceUpdate();
  }

  render(){
      const { classes } = this.props;
      console.log("Current", this.props);

      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
             <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <h1>Pick the words in order</h1>
                  <hr/>
                  <h1 style={sentenceStyle}>{this.props.sentences.selectedSentence} </h1>
                  <hr/>
                  <OptionGrid nextSentence = {this.nextSentence.bind(this)}
                              sentencePos={this.state.sentencePos}
                              randomWords={this.props.sentences.randomWords}
                              selectedSentence= {this.props.sentences.selectedSentence}
                  />
              </Paper>
            </Grid>
          </Grid>
        </div>
       );
  }
}

function  mapStateToProps(state){
  return {
    sentences : state.sentences
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getSentence: getSentence,
    getRandomWords: getRandomWords
  },
  dispatch)
}

MainGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainGrid));