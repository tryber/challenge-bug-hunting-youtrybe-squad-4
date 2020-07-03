import React, { Component } from 'react';
import VideoLike from './VideoLike';

class VideoPlayerInfo extends Component {
  render() {
    const { id, title, statisticsInfo } = this.props;
    return (
      <div data-testid="videoinfo" className="video-info">
        <h1 className="title">{title}</h1>
        <div className="video-toolbar">
          <span className="video-views">{`${statisticsInfo.viewCount} views`}</span>
          <span className="right-menu">
            <VideoLike videoId={id} statistics={statisticsInfo} />

            <a className="share-btn">
              <i className="material-icons">reply</i>
              <span>SHARE</span>
            </a>

            <a className="save-btn">
              <i className="material-icons">playlist_add</i>
              <span>SAVE</span>
            </a>
            <a className="options-btn">
              <i className="material-icons">more_horiz</i>
            </a>
          </span>
        </div>
      </div>
    );
  }
}

export default VideoPlayerInfo;
