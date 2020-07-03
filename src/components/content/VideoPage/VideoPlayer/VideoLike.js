import React, { Component } from 'react';
import { addItem } from '../../../../service/localStorage'

class VideoLike extends Component {
  constructor(props) {
    super(props);

    this.state = { isLiked: null };
  }

  handleVideoLike(action) {
    const { videoId } = this.props;
    const { isLiked, isDesliked } = this.state;

    switch (action) {
      case 'like':
        this.setState({ isLiked: !isLiked, isDesliked: false });
        break;
      case 'deslike':
        this.setState({ isLiked: false, isDesliked: !isDesliked });
        break;
      default:
        break;
    }
  }

  render() {
    const { statistics } = this.props;
    const { isLiked, isDesliked } = this.state;

    return (
      <div className="thumb-wrapper">
        <a
          className={`thumb-up-btn ${isLiked && 'liked'}`}
          onClick={() => this.handleVideoLike('like')}
        >
          <i className="material-icons">thumb_up</i>
          <span className="thumbs-count">{statistics.likeCount}</span>
        </a>

        <a
          className={`thumb-down-btn ${isDesliked && 'desliked'}`}
          onClick={() => this.handleVideoLike('deslike')}
        >
          <i className="material-icons">thumb_down</i>
          <span className="thumbs-count">{statistics.dislikeCount}</span>
        </a>
      </div>
    );
  }
}

export default VideoLike;
