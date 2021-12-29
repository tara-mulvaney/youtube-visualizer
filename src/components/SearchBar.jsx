import React, { Component } from 'react';
import  { AutoComplete, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const Option = AutoComplete.Option;
// import ProgressBar from './ProgressBar.jsx';


class SearchBar extends Component {
    state = {
      videos: [],
      input: '',
    };

    componentDidUpdate(prevProps) {
      if( this.props.video && prevProps.video !== this.props.video ) {
          this.setState({ videos: this.props.videos })
      }
    }

    onSelect = (value, index) => {
        let val = parseInt(index.key, 10);
        this.props.handleSearch(val);
    };


  onClick = (value) => {
    if(this.props.length < 5) {
      this.props.onChange();
    } else {
      alert('please enter an artist or song to search for');
    }
  }

    render() {
        return(
          <div>
            <div className="SearchBar">
                <AutoComplete
                    onSelect={ this.onSelect }
                    onChange={ this.props.onChange }
                    placeholder=" Search Artist/Song "
                >
                    { this.state.videos.map((video, index)  => 
                      <Option className="AutoComplete" key={ index } >{ video.snippet.title }</Option> ) }
                </AutoComplete>
                <Button
                    className="SearchIcon"
                    onClick={ this.onClick }
                >
                <SearchOutlined/>
                </Button>
            </div>
          </div>
        );
    }
}

export default SearchBar
