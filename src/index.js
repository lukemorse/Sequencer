import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TempoSlider, GainSlider} from './Sliders.js';

var numBeats = 16;
var subDiv = 4;
var buttonRows = [];
for (var i = 0; i < numBeats; i++) {
  buttonRows.push(i);
}

const sounds = [
  {
    name: 'Sound0',
    url: 'kick 11.wav',
  },
  {
    name: 'Sound1',
    url: 'Hat 52.wav',
  },
  {
    name: 'Sound2',
    url: 'Clap 13.wav',
  },
  {
    name: 'Sound3',
    url: 'snare 347.wav',
  },
];

class PlayPauseButton extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'PLAY',
    };
  }

  render() {
    return (
      <button className={'PlayPauseButton'} onClick={() => this.props.onClick()}>
        {this.props.status}
      </button>
    );
  }
}

class SampleButton extends React.Component {
  render() {
    return <button className={this.props.className} onClick={() => this.props.onClick()} id={this.props.id} />;
  }
}

class Sampler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // buttons: Array(sounds.length).fill(Array(buttonRows.length).fill(false)),
      buttons: [
        [true, false, false, false, false, false, false, false, true, false, false, true, false, false, false, false],
        [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
        [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
        [false, false, false, false, false, false, false, true, false, true, false, false, true, false, false, false],
      ],
      currentBeat: null,
      isPlaying: false,
      tempo: 225,
      gain: 0.5,
    };
  }

  playPauseBeat() {
    if (this.state.isPlaying) {
      clearInterval(this.state.interval);
      this.setState({
        isPlaying: false,
      });
    } else {
      this.setState({
        interval: setInterval(() => this.advanceBeat(), 30000 / this.state.tempo),
        isPlaying: true,
      });
    }
  }

  getButtonClassName(active, num) {
    var result = '';
    var div = numBeats / subDiv;
    var arr = [0, 1, 2, 3, 8, 9, 10, 11];
    if (active) {
      result += 'active';
    }
    if (arr.includes(num)) {
      result += ' altBeat';
    }
    return result;
  }

  checkForLineBreak(row) {
    console.log(row);
    return row === 8 ? <div>{/*<br />
        <br />*/}</div> : null;
  }

  makeColumnOfButtons(row) {
    // className={this.getButtonClassName(this.state.buttons[column][row], row)}
    const buttons = sounds.map(({name}, column) => (
      <SampleButton
        key={row + name}
        beat={row}
        activeBeat={this.props.activeBeat}
        isPressed={this.state.buttons[column][row]}
        onClick={() => this.handleClick(column, row)}
        className={this.state.buttons[column][row] ? 'active' : ''}
        id={this.state.currentBeat === row ? 'currentBeat' : ''}
      />
    ));
    return <ul className={'buttonColumn'}>{buttons}</ul>;
  }

  handleClick(i, j) {
    // Make copy of state.buttons to mutate
    let oldState = this.state.buttons;
    var newState = [];
    for (var index = 0; index < oldState.length; index++) {
      newState[index] = oldState[index].slice();
    }
    let buttonToChange = newState[i][j];
    let changedButton = buttonToChange === true ? false : true;
    newState[i][j] = changedButton;
    this.setState({buttons: newState});
  }

  makeTableOfButtons() {
    const buttonColumns = buttonRows.map(row => (
      <div key={row}>
        {this.checkForLineBreak(row)}
        {this.makeColumnOfButtons(row)}
      </div>
    ));
    return buttonColumns;
  }

  advanceBeat() {
    let currentBeat = this.state.currentBeat !== null ? (this.state.currentBeat + 1) % buttonRows.length : 0;
    for (let i = 0; i < this.state.buttons.length; ++i) {
      const enabled = this.state.buttons[i][currentBeat];
      if (enabled) {
        playSound(i);
      }
    }
    this.setState({currentBeat});
  }

  changeTempo(tempo) {
    clearInterval(this.state.interval);
    const shouldSetInterval = this.state.isPlaying;
    this.setState({
      tempo: tempo,
      interval: shouldSetInterval ? setInterval(() => this.advanceBeat(), 30000 / tempo) : null,
    });
  }

  render() {
    return (
      <div>
        <TempoSlider onChange={tempo => this.changeTempo(tempo)} />
        <GainSlider onChange={gain => changeGain(gain)} />
        <PlayPauseButton onClick={() => this.playPauseBeat()} status={this.state.isPlaying ? 'PAUSE' : 'PLAY'} />
        <div className={'ButtonMatrix'}>
          <ul>{this.makeTableOfButtons()}</ul>
        </div>
      </div>
    );
  }
}

// ========================================

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5;
gainNode.connect(audioContext.destination);

const promises = sounds.map(({url}, index) => {
  return fetch(url)
    .then(response => {
      return response.arrayBuffer();
    })
    .then(body => {
      return new Promise((resolve, reject) => audioContext.decodeAudioData(body, resolve, reject));
    })
    .then(decoded => {
      sounds[index].buffer = decoded;
    });
});

function playSound(index) {
  const node = audioContext.createBufferSource();
  node.buffer = sounds[index].buffer;
  node.connect(gainNode);
  node.start();
}

function changeGain(gain) {
  gainNode.gain.value = gain;
}

Promise.all(promises)
  .then(() => {
    const rootComponent = ReactDOM.render(<Sampler />, document.getElementById('root'));
  })
  .catch(err => {
    // TODO: render a "loading failed" component probably
    document.body.innerHTML = `<h1>blurrr some kinda err: ${err}</h1>`;
  });
