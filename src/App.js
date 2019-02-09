import React, { Component } from 'react';
import voltorb from './assets/voltorb.png';
import './App.css';

var isGameFinished = false;

class Case extends Component {
  constructor(props) {
    super(props);
    this.isInfoCase = false;
    this.onClick = this.onClick.bind(this);
    this.isFlipping = false;
    if(props.voltorbs !== undefined) {
      this.isInfoCase = true;
    } else {
      this.state = {isFlipping: false, flipped: this.props.flipped};
    }
  }
  
  componentWillReceiveProps(props) {
    this.render();
    if(props.flipped && !this.state.flipped)
      this.flip();
  }

  onClick(e) {
    if(this.isFlipping || isGameFinished)
      return;
    this.flip();
    this.props.onClick(this.props);
  }

  flip() {
    this.setState({isFlipping: true});
    this.isFlipping = true;
    setTimeout(() => {this.setState({isFlipping: false, flipped: true})}, 250);
  }

  render() {
    if(!this.isInfoCase) {
      const {flipped} = this.state;
      return flipped ? (
          <div className={"case"+(this.state.isFlipping ? " flipping" : "")}>
            {this.props.value !== 0 ? <p>{this.props.value}</p> : <img src={voltorb}></img>}
          </div>
        ) : (
          <div onClick={this.onClick} className={"case"+(this.state.isFlipping ? " flipping" : "")}>
          </div>
        );
    } else {
      return (
        <div className="case info">
          <p className="score">{this.props.score}</p>
          <p><img src={voltorb}></img>{this.props.voltorbs}</p>
        </div>
      );
    }
  }
}

class Grid extends Component {
  componentWillReceiveProps(props) {
    if(props.gameTerminated) {
      this.render();
    }
  }

  render() {
    return (
      <div id="grid">
        {this.props.cases.map(current => current.map(current2 => 
          current2.value !== undefined ? 
            <Case onClick={this.props.onCaseClicked} position={current2.position} flipped={this.props.gameTerminated ? true : current2.flipped} value={current2.value} key={current2.position.join(";")} />
          : 
            <Case score={current2.score} voltorbs={current2.voltorbs} key={current2.position.join(";")}/>))}
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.caseClicked = this.caseClicked.bind(this);

    let cases = [];

    let sumLine = 0;
    let voltorbsLine = 0;
    let sumColumn = [0, 0, 0, 0, 0];
    let voltorbsColumn = [0, 0, 0, 0, 0];

    let maxScore = 1;

    let bombPercent = 20, onePercent = 40, twoPercent = 30;

    var p = [
      0,
      bombPercent,
      bombPercent + onePercent,
      bombPercent + onePercent + twoPercent,
      100 ];

    for(let i = 0; i < 5; i++) {
      sumLine = 0;
      voltorbsLine = 0;
      cases[i] = [];
      for(let j = 0; j < 5; j++) {
        let nb = Math.random()*100;
        let value;
        for (let k = 0; k < 4; k++) {
          if (nb >= p[k] && nb <= p[k + 1]) {
            value = k;
            break;
          }
        }

        cases[i][j] = {value: value, flipped: false, position: [i,j]};
        sumLine += value;
        sumColumn[j] += value;
        if(value === 0) {
          voltorbsLine++;
          voltorbsColumn[j]++;
        } else {
          maxScore *= value;
        }
      }
      cases[i][6] = {score: sumLine, voltorbs: voltorbsLine, position: [i, 6]};
    }

    cases[6] = [];
    for(let i = 0; i < 5; i++)
      cases[6][i] = {score: sumColumn[i], voltorbs: voltorbsColumn[i], position: [6,i]};

    this.state = {infoClasses: "", score: 0, maxScore: maxScore, cases: cases, lose: false, terminated: false};
  }

  caseClicked(c) {
    this.setState(current => ({lose: c.value === 0, score: current.score === 0 && c.value !== 0 ? c.value : current.score*c.value}));
  }

  render() {
    if(!isGameFinished && (this.state.score === this.state.maxScore || this.state.lose)) {
      isGameFinished = true;
      this.setState({terminated: true});
      setTimeout(() => this.setState({infoClasses: "visible"}), 100);
      setTimeout(() => this.setState({infoClasses: ""}), 3500);
      setTimeout(() => this.setState({terminated: true}), 4000);
    }
    return (
      <div className="App">
        <h1>Voltorbataille en ligne</h1>
        <p id="score">Score : {this.state.score}</p>
        {this.state.terminated && <h1 className={this.state.infoClasses} id="infoMsg">{this.state.lose ? "Partie perdue" : "Partie gagnée !"}</h1>}
        <Grid gameTerminated={this.state.terminated} onCaseClicked={this.caseClicked} cases={this.state.cases}/>
      </div>
    );
  }
}

export default App;