import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

class TempoSlider extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 1,
    };
  }

  handleChange = value => {
    if (value !== this.state.value) {
      this.setState({
        value: value,
      });
      this.props.onChange(value);
    }
  };

  render() {
    const {value} = this.state;
    return (
      <div>
        <div className="slider">
          <Slider min={75} max={350} step={25} reverse={false} value={value} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

class GainSlider extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 1,
    };
  }

  handleChange = value => {
    if (value !== this.state.value) {
      this.setState({
        value: value,
      });
      this.props.onChange(value);
    }
  };

  render() {
    const {value} = this.state;
    return (
      <div>
        <div className="slider">
          <Slider min={0.0} max={1.0} step={0.1} value={value} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export {TempoSlider, GainSlider};
