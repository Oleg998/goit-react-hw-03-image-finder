import { Component } from 'react';
import { searceImg } from 'Api/Gallery';
import Button from '../Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';

export default class ImageGalleryIten extends Component {
  state = {
    hits: [],
    isLoading: false,
    error: null,
    page: 1,
    openModal: false,
    imgDetails: {},
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchItem;
    const nextSearch = this.props.searchItem;
    if (prevSearch !== nextSearch || this.state.page !== prevState.page) {
      this.setState({
        isLoading: true,
        hits: [],
        page: 1,
        totalHits: '',
      });
      try {
        const { data } = await searceImg(nextSearch, this.state.page);
        console.log(data);
        this.setState(({ hits }) => ({
          hits: data.hits?.length ? [...hits, ...data.hits] : hits,
          totalHits: data.totalHits,
        }));
      } catch (error) {
        this.setState({
          error: error.message,
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  LoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  showModal = ({ tags, largeImageURL }) => {
    this.setState({ openModal: true, imgDetails: { tags, largeImageURL } });
  };
  closeModal = () => {
    this.setState({ openModal: false, imgDetails: {} });
  };

  render() {
    const { LoadMore, closeModal, showModal } = this;
    const { hits, isLoading, error, openModal, imgDetails } = this.state;

    const isImg = Boolean(hits.length);
    return (
      <>
        {error && <p>..............{error}..................</p>}
        {isLoading && <Loader></Loader>}
        <ImageGallery hits={hits} showModal={showModal} />

        {isImg && (
          <Button onClick={LoadMore} type="button">
            Load more
          </Button>
        )}
        {Boolean(openModal) && (
          <Modal close={closeModal}>
            <img src={imgDetails.largeImageURL} alt={imgDetails.tags} />
          </Modal>
        )}
      </>
    );
  }
}
