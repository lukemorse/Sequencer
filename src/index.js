import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import DrumMachine from 'react-drum-machine';
import PubSub from 'pubsub-js';
import 'babel-polyfill';

const song = {
    "title": "example",
    "beatpermeasure": 4,
    "bpm": 79,
    "divisionperbeat": 4,
    "instruments": [
  	{
        "title": "hihat",
        "image": "img/hihat.png",
        "sound": "https://content.dropboxapi.com/1/files/auto/CyCdh_K3ClHat-01.wav",
        "bearer": "JfnDpAnZcQ8AAAAAAAABYbt6Zvq6-U10DeFgzcZEbz7XYZrTv9ugPuuRl0ai9BFR",
        "bits": [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]
  	},
  	{
        "title": "snare",
        "image": "http://i.imgur.com/NwDw9lZ.png",
        "sound": "https://content.dropboxapi.com/1/files/auto/snare.mp3",
        "bearer": "JfnDpAnZcQ8AAAAAAAABYbt6Zvq6-U10DeFgzcZEbz7XYZrTv9ugPuuRl0ai9BFR",
        "bits": [0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1]
  	},
  	{
        "title": "kick",
        "image": "http://i.imgur.com/CmsdE9k.png",
        "sound": "https://content.dropboxapi.com/1/files/auto/kick.mp3",
        "bearer": "JfnDpAnZcQ8AAAAAAAABYbt6Zvq6-U10DeFgzcZEbz7XYZrTv9ugPuuRl0ai9BFR",
        "bits": [1,1,1,1,0,1,0,1,0,0,0,0,0,1,1,1,1]
  	}
  ]
}

// ========================================

ReactDOM.render(
  <div>
    <button onClick={() => PubSub.publish('drum',{action:'play'})}>Play</button>
    <button onClick={() => PubSub.publish('drum',{action:'stop'})}>Stop</button>
    <DrumMachine song={song} />
  </div>,
  document.getElementById('root')
);
