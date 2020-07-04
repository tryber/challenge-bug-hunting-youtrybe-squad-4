import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import VideoPlayerDescription from './VideoPlayer/VideoPlayerDescription';
import VideoPlayerInfo from './VideoPlayer/VideoPlayerInfo';
import VideoPlayerComments from './VideoPlayerComments/VideoPlayerComments';
import VideoSideBar from './VideoSideBar/VideoSideBar';
import { getVideoInfo, getVideoComments } from './../../../api/service';

class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: props.match.params.videoId,
      relatedVideos: props.location.state.data,
      videoInfo: null,
      videoComments: null,
      redirect: false,
      selected: null,
    };
    this.handleSelectedVideo = this.handleSelectedVideo.bind(this);
    this.updateVideoId = this.updateVideoId.bind(this);
    this.cancelRedirect = this.cancelRedirect.bind(this);
    this.getInfoComments = this.getInfoComments.bind(this);
    this.generateSideBar = this.generateSideBar.bind(this);
  }

  componentDidMount() {
    const { match: { params: { videoId } } } = this.props;
    this.getInfoComments(videoId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { videoId } = this.state;
    this.cancelRedirect();
    console.log(videoId, prevState.videoId)
    if (prevState.videoId !== videoId) {
      this.updateVideoId();
    }
  }

  getInfoComments(videoId) {
    getVideoInfo(videoId).then((data) => {
      this.setState({ videoInfo: data.items[0] });
    });
    getVideoComments(videoId).then((data) => {
      this.setState({ videoComments: data.items });
    });
  }

  cancelRedirect() {
    const { redirect } = this.state;
    if (redirect) return this.setState({ redirect: false });
    return null;
  }

  updateVideoId() {
    const { videoId } = this.state;
    this.getInfoComments(videoId);
  }

  handleSelectedVideo(videoIdParam) {
    this.setState({ redirect: true, selected: videoIdParam, videoId: videoIdParam });
  }

  generateSideBar() {
    const { relatedVideos } = this.state;

    return (
      <section className="sidebar">
        <VideoSideBar
          relatedVideos={relatedVideos}
          handleSelectedVideo={this.handleSelectedVideo}
        />
      </section>
    );
  }

  render() {
    console.log(this.state)
    const { videoInfo, videoComments, redirect, selected, relatedVideos, videoId } = this.state;
    if (!videoInfo || !videoComments) return <main />;
    if (redirect) {
      return <Redirect to={{ pathname: `/watch/${selected}`, state: { data: relatedVideos } }} />;
    }
    return (
      <main>
        <section className="player">
          <VideoPlayer embedId={videoId} />
          <VideoPlayerInfo statisticsInfo={videoInfo.statistics} id={videoId} title={videoInfo.snippet.title} />
          <VideoPlayerDescription
            channelTitle={videoInfo.snippet.channelTitle}
            description={videoInfo.snippet.description}
            publishedAt={videoInfo.snippet.publishedAt}
          />
          <VideoPlayerComments
            statisticsInfo={videoInfo.statistics}
            videoComments={videoComments}
          />
        </section>
        {this.generateSideBar()}
      </main>
    );
  }
}

export default VideoPage;
