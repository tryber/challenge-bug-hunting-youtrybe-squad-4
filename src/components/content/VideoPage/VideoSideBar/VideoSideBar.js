import React, { Component, Fragment } from 'react';
import VideoThumbNail from './VideoThumbNail';
import VideoThumbNailInfo from './VideoThumbNailInfo';

import '../../../../css/sideBar.css';

class VideoSideBar extends Component {
  render() {
    const { relatedVideos, handleSelectedVideo } = this.props;
    return (
      <div>
        {relatedVideos.map((video) => (
          <Fragment key={video.id.videoId}>
            <div
              data-testid="selectedVideo"
              className="suggested-video"
              onClick={() => handleSelectedVideo(video.id.videoId)}
            >
              <VideoThumbNail
                videoId={video.id.videoId}
                imageSource={video.snippet.thumbnails.medium.url}
              />
              <VideoThumbNailInfo
                title={video.snippet.title}
                channel={video.snippet.channelTitle}
              />
            </div>
          </Fragment>
        ))}
      </div>
    );
  }
}

export default VideoSideBar;
