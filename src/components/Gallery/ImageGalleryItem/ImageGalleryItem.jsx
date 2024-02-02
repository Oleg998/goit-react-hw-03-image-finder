import { Component } from 'react';
import { searceImg } from 'Api/Gallery';
import Button from '../Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';

export default class ImageGalleryIten extends Component {
  state = {
    search:"",
    hits: [],
    isLoading: false,
    error: null,
    page: 1,
    openModal: false,
    imgDetails: {},
    totalHits: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const{search , page}=this.state
    const prevSearch = prevState.search;
    const nextSearch = search;
    if (prevSearch !== nextSearch || page !== prevState.page) {
      this.setState({
        isLoading: true,
        //page:this.props.defpage,
        hits: [],
        totalHits: '',
      });
      try {
        const { data } = await searceImg(nextSearch, this.state.page);

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

  handelSearchForm = data => {
    this.setState({
      search: data,
      page: 1,
    });
  };

  render() {
    const { LoadMore, closeModal, showModal, handelSearchForm } = this;
    const { hits, isLoading, error, openModal, imgDetails, totalHits, page } =
      this.state;
    const totalPage = Math.ceil(totalHits / 12);

    return (
      <>
        {error && <p>..............{error}..................</p>}
        {isLoading && <Loader></Loader>}
        <Searchbar onSubmit={handelSearchForm} />
        <ImageGallery hits={hits} showModal={showModal} />

        {totalPage > page && (
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
