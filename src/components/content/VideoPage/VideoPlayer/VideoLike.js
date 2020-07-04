import React, { Component } from "react";
import { addItem, removeItem } from "../../../../service/localStorage";

class VideoLike extends Component {
  constructor(props) {
    super(props);

    this.state = { isLiked: null, isDesliked: null };
  }

  handleVideoLike(action) {
    const { videoId } = this.props;
    const { isLiked, isDesliked } = this.state;

    switch (action) {
      case "like":
        this.setState({ isLiked: !isLiked, isDesliked: false }, () => {
          removeItem("videosLike", { id: videoId });
          if (!isLiked) {
            addItem("videosLike", { id: videoId, like: true });
          }
        });
        break;
      case "deslike":
        this.setState({ isLiked: false, isDesliked: !isDesliked }, () => {
          removeItem("videosLike", { id: videoId });
          if (!isDesliked) {
            addItem("videosLike", { id: videoId, deslike: true });
          }
        });
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
          className="thumb-up-btn"
          onClick={() => this.handleVideoLike("like")}
        >
          <i className={`material-icons ${isLiked && 'thumb-selected'}`}>
            thumb_up
          </i>
          <span className="thumbs-count">{statistics.likeCount}</span>
        </a>

        <a
          className="thumb-down-btn"
          onClick={() => this.handleVideoLike("deslike")}
        >
          <i className={`material-icons ${isDesliked && 'thumb-selected'}`}>
            thumb_down
          </i>
          <span className="thumbs-count">{statistics.dislikeCount}</span>
        </a>
      </div>
    );
  }
}

export default VideoLike;
