import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Sound from 'react-sound'

class SoundPlayer extends React.Component {
  // constructor() {
  //
  // }
  render() {
    return <Sound
      url="http://www.fundmental.com/funpages/wavs/guff.wav"
      playStatus={Sound.status.PLAYING}
      playFromPosition={300 /* in milliseconds */}
      onLoading={this.handleSongLoading}
      onPlaying={this.handleSongPlaying}
      onFinishedPlaying={this.handleSongFinishedPlaying}
       />
  }
}


class FartButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive : false,
      url : 'http://www.fundmental.com/funpages/wavs/guff.wav',
      playStatus : Sound.status.PLAYING,
      playFromPosition : 300 /* in milliseconds */,
      onLoading : this.handleSongLoading,
      onPlaying : this.handleSongPlaying,
      onFinishedPlaying : this.handleSongFinishedPlaying,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const p = this.state.playStatus
    console.log(p)
    this.setState({
      isActive : !this.state.isActive,
      playStatus : p =>
      { return
        p == Sound.status.STOPPED ? Sound.status.PLAYING : Sound.status.STOPPED
      },
    })
  }

  render() {
    return <span>
      <button
        className = {this.state.isActive ? "active" : ""}
        onClick={this.handleClick}>
      </button>
      <Sound
        url={this.state.url}
        playStatus={this.state.playStatus}
        playFromPosition={this.state.playFromPosition}
        />
    </span>
  }
}

class ButtonMatrix extends React.Component {
  constructor() {
    super();
    this.state = {
      url : 'http://www.fundmental.com/funpages/wavs/guff.wav',
      playStatus : Sound.status.STOPPED,
      playFromPosition : 300 /* in milliseconds */,
      onLoading : this.handleSongLoading,
      onPlaying : this.handleSongPlaying,
      onFinishedPlaying : this.handleSongFinishedPlaying,
    }
  }

  handleClick() {
    this.setState({playStatus : Sound.status.PLAYING})
  }

  makeRowOfButtons(name) {
    const buttonArray = Array(10).fill(name)
    const buttons = buttonArray.map((name) =>
    <FartButton>
    </FartButton>
    );
  return <ul>{buttons}</ul>
  }

  render() {
    const buttonArray = ["Sound0","Sound1","Sound2","Sound3","Sound4","Sound5",
    "Sound6","Sound7","Sound8","Sound9"];
    const buttons = buttonArray.map((name) =>
    <div>
      {this.makeRowOfButtons(name)}
  </div>);
    return <ul>{buttons}</ul>
  }

}

// ========================================

ReactDOM.render(
  <ButtonMatrix/>,
  document.getElementById('root')
);
