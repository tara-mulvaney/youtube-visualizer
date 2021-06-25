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

    let amp, fft, canvas, dimension, mic, micLevel, context, grad, vol


    p.setup = () => {
        dimension = p.min(p.windowWidth / 1.5, p.windowHeight / 1.5)
        p.angleMode(p5.DEGREES);
        canvas = p.createCanvas(dimension, dimension)
        mic = new p5.AudioIn();
        mic.start(p.userStartAudio);
        amp = new p5.Amplitude(0.1);
        fft = new p5.FFT()
        fft.setInput(mic);

    }

    p.draw = () => {
      let vol = mic.getLevel();
      p.background(0);
      p.noFill();
      p.stroke(255);
      p.ellipse(dimension/2, dimension/2, vol*500, vol*500);
      p.ellipse(dimension/2, dimension/2, vol*700, vol*700);
      p.ellipse(dimension/2, dimension/2, vol*1000, vol*1000);


      p.translate(dimension/2, dimension/2);

      let wave = fft.waveform();
      for (let t = -1; t<=1; t+=2) {
      p.beginShape();
      for (let i = 0; i < 180; i += 1) {
        let index = p.floor(p.map(i,0,180,0,wave.length - 1))

        let r = p.map(wave[index], -1,1,150,350)

        let x = r * p.sin(i);
        let y = r * p.cos(i);
        p.vertex(x/2,y/2)
      }
      p.endShape();
    }
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
