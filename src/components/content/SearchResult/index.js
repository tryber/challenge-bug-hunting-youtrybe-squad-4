import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard/VideoCard';

import '../../../css/sideBar.css';
import { searchVideos } from '../../../api/service';

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: '',
    };

    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    const { match: { params: { searchParam } } } = this.props;
    this.updateData(searchParam);
  }

  componentDidUpdate(nextProps) {
    const { match: { params: { searchParam } } } = this.props;

    if (nextProps.match.params.searchParam !== searchParam) {
      this.updateData(searchParam);
    }
  }

  updateData(param) {
    searchVideos(param)
      .then((data) => {
        console.log(data, param);
        this.setState({ data: data.items });
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { data, error } = this.state;
    if (data.length < 1) return <span>Loading...</span>;
    if (error) return <span>Página não encontrada</span>;
    return (
      <div>
        {data.map((item) => (
          <Link
            className="thumbnail-card"
            key={item.etag}
            to={{
              pathname: `/watch/${item.id.videoId}`,
              state: { data },
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
