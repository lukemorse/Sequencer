import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

export class TempoSlider extends React.Component {
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
          <Slider min={100} max={400} value={value} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export class GainSlider extends React.Component {
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
          <Slider min={100} max={400} value={value} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}
