import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { saveItem, addItem } from '../../../../service/localStorage';
import '../../../../css/chanelInfo.css';

class VideoPlayer extends Component {
  render() {
    const { embedId } = this.props;
    const playerURL = `https://www.youtube.com/embed/${embedId}`;
    return (
      <div className="youtube-player">
        <ReactPlayer url={playerURL} width="100%" height="470px" onStart={() => addItem('watch', { id: embedId })} />
      </div>
    );
  }
}

export default VideoPlayer;
