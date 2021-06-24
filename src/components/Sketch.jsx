import React, {Component} from 'react';
import '../helpers/p5sound-fix.js';
import 'p5/lib/addons/p5.sound.js';
import * as p5 from 'p5';

class Sketch extends React.Component {
  constructor(props) {
    super(props)
      this.myRef = React.createRef();

}
Sketch = (p) => {

    let amp, fft, canvas, dimension, mic, micLevel

    p.setup = () => {
        dimension = p.min(p.windowWidth / 1.5, p.windowHeight / 1.5)
        canvas = p.createCanvas(dimension, dimension)
        mic = new p5.AudioIn();
        mic.start(p.userStartAudio);
        amp = new p5.Amplitude(0.1);
        fft = new p5.FFT()
    }

    p.draw = () => {
      let vol = mic.getLevel();
      p.background(0);
      p.fill(255);
      p.ellipse(100, 100, vol*250, vol*250);
      p.ellipse(300, 300, vol*250, vol*250);
      p.ellipse(400, 400, vol*250, vol*250);
    }

    p.windowResized = () => {
        dimension = p.min(p.windowWidth / 1.5, p.windowHeight / 1.5)
        p.resizeCanvas(dimension, dimension)
    }
  }

componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current)
}

componentDidUpdate() {
    this.myP5.remove()
    this.myP5 = new p5(this.Sketch, this.myRef.current)
}

componentWillUnmount() {
    this.myP5.remove()
}
render() {
  return (
    <div ref={this.myRef}/>
  )
}
  }

  export default Sketch;
