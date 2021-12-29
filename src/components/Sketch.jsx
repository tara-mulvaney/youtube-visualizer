import React, {Component} from 'react';
// import './bubbleart.webp';
import '../helpers/p5sound-fix.js';
import 'p5/lib/addons/p5.sound.js';
import * as p5 from 'p5';

class Sketch extends Component {
  constructor(props) {
    super(props)
      this.myRef = React.createRef();

}
Sketch = (p) => {

    let fft, dimension, mic;

    // p.preload = () => {
    //   img = p.loadImage('./bubbleart.webp');
    // }

    p.setup = () => {
        dimension = p.min(p.windowWidth / 1.5, p.windowHeight / 1.5)
        p.angleMode(p.DEGREES);
        // p.imageMode(p5.CENTER);
        p.createCanvas(dimension, dimension);
        mic = new p5.AudioIn();
        mic.start(p.userStartAudio);
        // let amp = new p5.Amplitude(0.1);
        fft = new p5.FFT();
        fft.setInput(mic);
        // let wave = fft.waveform();

    }



    p.draw = () => {
      // p.image(img, dimension, dimension);
      p.background(0);
      p.noFill();
      p.stroke(255);
      p.translate(0, -1, dimension/2, dimension/2);

      let vol = mic.getLevel();
      let wave = fft.waveform();

      for (let i = 0; i < 1; i ++) {
        let r = p.map(p.sin(p.frameCount), -1, 1, 100, 255)
        let g = p.map(i, 0, 20, 100, 255)
        let b = p.map(p.cos(p.frameCount),-1, 1, 255, 100)
  
        p.stroke(r,g,b);
        
      // p.ellipse(dimension/2, dimension/2, vol*400, vol*400);
      // p.ellipse(dimension/2, dimension/2, vol*700, vol*700);
      // p.ellipse(dimension/2, dimension/2, vol*1000, vol*1000);
      // p.translate(dimension/2, dimension/2);
      
      
      p.beginShape()
      p.ellipse(dimension/2, dimension/2, vol*10, vol*10);
      p.ellipse(dimension/2, dimension/2, vol*50, vol*50);
      p.ellipse(dimension/2, dimension/2, vol*100, vol*100);
      p.translate(dimension/2, dimension/2);
      
      for (let i = 0; i < 360; i += 0.5) {
        let index = p.floor(p.map(i, 0, 360, 0, wave.length - 1))
        
        let rad = p.map(wave[index], -1, 1, 50, 150)
        let x = rad * p.sin(i);
        let y = rad * p.cos(i);
        p.vertex(x,y);
      }
     

      
      
      p.endShape()
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