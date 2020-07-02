import React, { Component } from "react";
import VideoCard from "./VideoCard/VideoCard";
import { Link } from "react-router-dom";

import "../../../css/sideBar.css";
import { searchVideos } from "../../../api/service";

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: "",
    };

    this.updateData = this.updateData.bind(this);
  }

  updateData(param) {
    searchVideos(param)
      .then((data) => {
        this.setState({ data: data.items });
      })
      .catch((error) => this.setState({ error: error }));
  }

  componentDidMount() {
    console.log()
    const {
      params: { searchParam },
    } = this.props.match;

    this.updateData(searchParam);
  }

  componentDidUpdate(nextProps) {
      const {
        params: { searchParam },
      } = this.props.match;

    if (nextProps.match.params.searchParam !== searchParam) {
      this.updateData(searchParam);
    }
  }

  render() {
    const { data } = this.state;
    if (data.length < 1) return <div>Loading...</div>;

    return (
      <div>
        {data.map((item) => (
          <Link
            className="thumbnail-card"
            key={item.etag}
            to={{
              pathname: `/watch/${item.id.videoId}`,
              state: { data: data },
            }}
          >
            <VideoCard key={item.id.videoId} video={item} />
          </Link>
        ))}
      </div>
    );
  }
}

export default SearchResult;
