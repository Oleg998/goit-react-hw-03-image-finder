import { Component } from 'react';
import { searceImg } from 'Api/Gallery';

import css from './Post.module.css';

class Post extends Component {
  state = {
    hits: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    searceImg()
      .then(({ data }) => {
        this.setState({
          hits: data.hits?.length ? data.hits : [],
        });
      })
      .catch(error => {
        this.setState({
          error: error.message,
        });
      })
      .finally(() =>
        this.setState({
          isLoading: false,
        })
      );
  }

  render() {
    const { hits, isLoading, error } = this.state;
    const elemets = hits.map(({ id, webformatURL, tags }) => (
      <li key={id} className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
        />
      </li>
    ));
    return (
      <>
        {error && <p>..............{error}..................</p>}
        {isLoading && <p>..........Loading...............</p>}
        {Boolean(elemets.length) && (
          <ul className={css.ImageGallery}>{elemets}</ul>
        )}
      </>
    );
  }
}

export default Post;
