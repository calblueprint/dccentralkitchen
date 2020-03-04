import React from 'react';

class ProgressBarExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 0
    };

    this.nextStep = this.nextStep.bind(this);
  }

  nextStep() {
    if (this.state.percentage === 100) return;
    this.setState(prevState => ({ percentage: prevState.percentage + 20 }));
  }

  render() {
    return (
      <div>
        <h2> A React Progress Bar </h2>
        <ProgressBar percentage={this.state.percentage} />

        <div style={{ marginTop: '20px' }}>
          <button onClick={this.nextStep}>Next Step</button>
        </div>

        <div
          style={{ marginTop: '10px', color: 'blue', marginBottom: '15px' }}
          onClick={() => this.setState({ percentage: 0 })}>
          Reset
        </div>
      </div>
    );
  }
}

export const ProgressBar = props => {
  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage} />
    </div>
  );
};

const Filler = props => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />;
};

// Other React Stuff

// Check out my free youtube video on how to build a thumbnail gallery in react
// https://www.youtube.com/watch?v=GZ4d3HEn9zg

// https://medium.com/@ItsMeDannyZ/build-an-image-slider-with-react-es6-264368de68e4

// Follow me on Github!
// https://github.com/DZuz14
