import React, { Component } from 'react';
import { getItem, addItem, removeItem } from '../../../../service/localStorage';

class VideoLike extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLiked: null,
      likeCount: Number(props.statistics.likeCount),
      isDisliked: null,
      dislikeCount: Number(props.statistics.dislikeCount),
    };

    this.handleVideoLike = this.handleVideoLike.bind(this);
  }

  componentDidMount() {
    const { videoId } = this.props;
    const videosLike = getItem('videosLike', videoId)
      
    if(videosLike) {
      const likeOrDislike = videosLike.find((video) => video.id === videoId);
      
      if (likeOrDislike) {
        if (likeOrDislike.like) {
          this.handleVideoLike();
        } else {
          this.handleVideoDislike();
        }
      }
    }
  }

  handleVideoLike() {
    const { videoId, statistics } = this.props;
    const { isLiked } = this.state;
    const originalLikes = Number(statistics.likeCount);
    const originalDislikes = Number(statistics.dislikeCount);

    this.setState({ isLiked: !isLiked, isDisliked: false }, () => {
      removeItem('videosLike', { id: videoId });
      if (!isLiked) {
        addItem('videosLike', { id: videoId, like: true });
        return this.setState({
          likeCount: originalLikes + 1,
          dislikeCount: originalDislikes,
        });
      }
      return this.setState({ likeCount: originalLikes });
    });
  }

  handleVideoDislike() {
    const { videoId, statistics } = this.props;
    const { isDisliked } = this.state;
    const originalLikes = Number(statistics.likeCount);
    const originalDislikes = Number(statistics.dislikeCount);

    this.setState({ isLiked: false, isDisliked: !isDisliked }, () => {
      removeItem('videosLike', { id: videoId });
      if (!isDisliked) {
        addItem('videosLike', { id: videoId, Dislike: true });
        return this.setState({
          likeCount: originalLikes,
          dislikeCount: originalDislikes + 1,
        });
      }
      return this.setState({ dislikeCount: originalDislikes });
    });
  }

  render() {
    const { isLiked, likeCount, isDisliked, dislikeCount } = this.state;

    return (
      <div className="thumb-wrapper">
        <a
          className="thumb-up-btn"
          onClick={() => this.handleVideoLike()}
        >
          <i className={`material-icons ${isLiked && 'thumb-selected'}`}>
            thumb_up
          </i>
          <span className="thumbs-count">{likeCount}</span>
        </a>

        <a
          className="thumb-down-btn"
          onClick={() => this.handleVideoDislike()}
        >
          <i className={`material-icons ${isDisliked && 'thumb-selected'}`}>
            thumb_down
          </i>
          <span className="thumbs-count">{dislikeCount}</span>
        </a>
      </div>
    );
  }
}

export default VideoLike;
