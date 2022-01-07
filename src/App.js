import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from 'components/searchBar';
import { ImageGallery } from 'components/imageGallery';
import { Modal } from 'components/modal';

export class App extends Component {
  state = {
    query: '',
    nextPage: 1,
    showModal: false,
    largeImg: '',
  };

  handleFormSubmit = search => {
    this.setState({ query: search });
  };

  handleButton = () => {
    this.setState(({ nextPage }) => ({
      nextPage: nextPage + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  showLargeImg = largeImg => {
    this.setState({ largeImg });
    this.toggleModal();
  };

  render() {
    const { handleFormSubmit, toggleModal, showLargeImg, handleButton } = this;
    const { query, nextPage, showModal, largeImg } = this.state;

    return (
      <div>
        <SearchBar submitFormFinder={handleFormSubmit} />

        <ImageGallery
          query={query}
          handleButtonLoadMore={handleButton}
          nextPage={nextPage}
          showLargeImg={showLargeImg}
        />

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImg} width="700" alt={query} />
          </Modal>
        )}

        <ToastContainer position="top-center" />
      </div>
    );
  }
}
