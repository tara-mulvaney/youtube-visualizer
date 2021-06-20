import React, { Component } from 'react';
import  { AutoComplete, Button, Icon } from 'antd';
const Option = AutoComplete.Option;
class SearchBar extends Component {
    state = {
      videos: []
    };

    componentDidUpdate(prevProps) {
      if( this.props.video && prevProps.video !== this.props.video ) {
          this.setState({ videos: this.props.videos })
      }
    }

    onSelect = (value, index) => {
        let val = parseInt(index.key, 10);
        this.props.handleSearch(val);
        // console.log('test')
    };

    render() {
        return(
          <div>
            <div className="SearchBar">
                <AutoComplete
                    onSelect={ this.onSelect }
                    onChange={ this.props.onChange }
                    placeholder="Search Video"
                >
                    { this.state.videos.map((video, index)  => <Option key={ index } >{ video.snippet.title }</Option> ) }
                </AutoComplete>
                <Button><Icon type={'search'}/></Button>
            </div>
          </div>
        );
    }
}

export default SearchBar
