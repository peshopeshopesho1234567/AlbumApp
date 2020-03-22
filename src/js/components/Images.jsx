import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import InfiniteScroll from 'react-infinite-scroller';

import Tile from './Tile.jsx';

const NUM_OF_IMAGES_PER_PAGE = 32;

class Images extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      visibleImages: []
    }
  }

  componentDidMount() {
    const { images } = this.props;
    this.setState(() => ({ visibleImages: images.slice(0, NUM_OF_IMAGES_PER_PAGE) }))
  }

  setVisibleImages(nextPage) {
    const { images } = this.props;
    this.setState(() => ({ visibleImages: images.slice(0, NUM_OF_IMAGES_PER_PAGE * nextPage) }));
  }

  static getDerivedStateFromProps(props, state) {
    const propImgsWoFavFlag = _.map(props.images, image => _.omit(image, ['isFavorited']));
    const stateImgsWoFavFlag = _.map(state.images, image => _.omit(image, ['isFavorited']));
    if (_.isEqual(propImgsWoFavFlag, stateImgsWoFavFlag)) {
      return null;
    }
    return { images: props.images, visibleImages: props.images.slice(0, NUM_OF_IMAGES_PER_PAGE) };
  }

  render() {
    const { visibleImages } = this.state;
    const { images } = this.props;
    return (
      <div className="imagesContainer">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.setVisibleImages.bind(this)}
          hasMore={visibleImages.length !== images.length}
          loader={<div key={0}>Loading...</div>}
        >
          {visibleImages && visibleImages.map(image => (
            <Tile
              key={image.url}
              image={image}
            />
          ))}
        </InfiniteScroll>
        {(visibleImages.length === 0) && <div style={styles.emptyAlbum}>The album is empty</div>}
      </div>
    )
  }
}

const styles = {
  emptyAlbum: { 
    textAlign: 'center', 
    fontSize: '30px', 
    fontWeight: 'bold' 
  }
}

const mapStateToProps = state => ({
  images: state.imagesFromSelectedAlbum
});

export default connect(mapStateToProps)(Images);
