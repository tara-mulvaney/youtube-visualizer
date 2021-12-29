import React, {Component} from 'react';
import './helpers/p5sound-fix.js';
import './App.css';
import 'p5/lib/addons/p5.sound.js';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar.jsx';
import VideoDetail from './components/VideoDetail.jsx';
import Sketch from './components/Sketch.jsx';
// import {YoutubeOutlined} from '@ant-design/icons';


const key = process.env.REACT_APP_YOUTUBE_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        videos: [],
        search: true,
        selectedVideo: {},
        audio: null,
      };
      this.toggleMicrophone = this.toggleMicrophone.bind(this);
}


  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({audio: null});
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  videoSearch(term) {
    if( this.state.search ) {
      YTSearch({ key: key, term }, (data) => {
        try {
          this.setState({ videos: data, selectedVideo: data[0] });
          console.log( this.state.videos );
        } catch(err){
          alert('error')({
          message: "Exceeded Daily Limit",
          description: "Exceeded YouTube Unit Daily Limit",
          })
        }
      });
    }
  }


  handleChange = (value) => {
    setTimeout( () => {
      if(this.state.search && value.length >= 5) {
        this.videoSearch(value);
      }
      setTimeout( () => {
        this.setState({ search: true });
      }, 3000);
    }, 1500);
  };


  render() {
    return (
      <div>
        <div>
          <a href = "https://youtubebasic.netlify.app/">
          <h1 className="Title" >YouTube Visualizer </h1>
          </a>
            <div className="Controls">
              <button className="Toggle, gradient-border" onClick={this.toggleMicrophone}>
                {this.state.audio ? 'Stop Visualizer' : 'Initiate Visualizer'}
              </button>
            </div>
            <SearchBar
                 videos={ this.state.videos }
                 video={ this.state.selectedVideo }
                 onChange={ this.handleChange }
                 handleSearch={ (video) => { this.setState({
                   selectedVideo: this.state.videos[video], search: false
                   })}
                 }
            />

            <div className="VideoDetail">
              <VideoDetail video={ this.state.selectedVideo }/>
            </div>

            <div className="Audio">
              {this.state.audio ? <Sketch className="Sketch" audio={this.state.audio} /> : ''}
            </div>
          </div>
      </div>
    )
  }
}

export default App;