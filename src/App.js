import React, { Component } from 'react';
import voltorb from './assets/voltorb.png';
import './App.css';

class Case extends Component {
  constructor(props) {
    super(props);
    this.isInfoCase = false;
    this.onClick = this.onClick.bind(this);
    this.isFlipping = false;
    if(props.voltorbs !== undefined) {
      this.isInfoCase = true;
    } else {
      this.state = {flipped: this.props.flipped};
    }
  }
  
  componentWillReceiveProps(props) {
    this.render();
  }

  onClick(e) {
    if(this.isFlipping)
      return;
    this.isFlipping = true;
    let target = e.target;
    target.style.transform = "scaleX(0)";
    this.props.onClick(this.props);
    setTimeout(() => {this.setState({flipped: true}); target.style.transform = "scaleX(1)"}, 250);
  }

  render() {
    if(!this.isInfoCase) {
      const {flipped} = this.state;
      return flipped ? (
          <div className="case">
            {this.props.value != 0 ? <p>{this.props.value}</p> : <img src={voltorb}></img>}
          </div>
        ) : (
          <div onClick={this.onClick} className="case">
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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="grid">
        {this.props.cases.map(current => current.map(current2 => 
          current2.value !== undefined ? 
            <Case onClick={this.props.onCaseClicked} position={current2.position} flipped={current2.flipped} value={current2.value} key={current2.position.join(";")} />
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

    for(let i = 0; i < 5; i++) {
      sumLine = 0;
      voltorbsLine = 0;
      cases[i] = [];
      for(let j = 0; j < 5; j++) {
        let value = Math.floor(Math.random()*4);
        cases[i][j] = {value: value, flipped: false, position: [i,j]};
        sumLine += value;
        sumColumn[j] += value;
        if(value == 0) {
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

    this.state = {score: 0, maxScore: maxScore, cases: cases, lose: false};
  }

  caseClicked(c) {
    this.setState(current => ({lose: c.value == 0, score: current.score == 0 && c.value != 0 ? c.value : current.score*c.value}));
  }

  render() {
    return (
      <div className="App">
        <h1>Voltorbataille en ligne</h1>
        <p>Score : {this.state.score}</p>
        {this.state.score == this.state.maxScore && <h1>Partie gagnée !</h1>}
        {this.state.lose && <h1>Partie perdue !</h1>}
        <Grid onCaseClicked={this.caseClicked} cases={this.state.cases}/>
      </div>
    );
  }
}

export default App;
