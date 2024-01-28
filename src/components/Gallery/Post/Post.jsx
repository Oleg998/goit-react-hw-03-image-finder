import { Component } from 'react';
import axios from 'axios';

import css from './Post.module.css';

class Post extends Component {
  state = {
    hits: [],
    isLoading: false,
    error:null,
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const params = {
      key: `40926027-5cb2084dfcf445810afb57cb9`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 12,
    };
    axios.get(`https://pixabayq.com/api/`, { params }).then(({ data }) => {
      this.setState({
        hits: data.hits?.length ? data.hits : [],
        isLoading: false,
      });
    })
    .catch(error => this.setState({
        isLoading:false, 
        error:error.massage,
    }));
  }

  render() {
    console.log(error);
    const { hits, isLoading , error} = this.state;
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
        {error && <p>..............Erorr..................</p>}
        {isLoading && <p>..........Loading...............</p>}
        <ul className={css.ImageGallery}>{elemets}</ul>
      </>
    );
  }
}

export default Post;
