import { Component } from 'react';
import s from './ImageGallery.module.css';

import { ImageGalleryItem } from 'components/imageGalleryItem';
import { Button } from 'components/button';
import { Loader } from 'components/loader';

import API from 'services/imagesApi';
import { getScroll } from 'services/getScroll';

export class ImageGallery extends Component {
  state = {
    hits: [],
    initialPage: 1,
    total: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    const { query, nextPage } = this.props;
    const { initialPage } = this.state;

    if (prevProps.query !== query) {
      this.setState({ hits: [], status: 'pending' });
      setTimeout(() => {
        API.fetchImages(query, initialPage)
          .then(({ hits, total }) =>
            this.setState({ hits, total, status: 'resolved' }),
          )
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1000);
    }

    if (prevProps.nextPage !== nextPage) {
      this.setState({ status: 'pending' });
      setTimeout(() => {
        API.fetchImages(query, nextPage)
          .then(res => {
            return this.setState(({ hits }) => {
              return {
                hits: [...hits, ...res.hits],
                status: 'resolved',
              };
            });
          })
          .then(
            setTimeout(() => {
              const { hits } = this.state;
              getScroll(hits);
            }, 300),
          )
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1000);
    }
  }

  render() {
    const { query, handleButtonLoadMore, showLargeImg } = this.props;
    const { hits, total, error, status } = this.state;

    if (status === 'idle') {
      return <p>Enter your request</p>;
    }

    if (status === 'pending') {
      return (
        <>
          {hits.length === 0 && <Loader />}

          {hits.length > 0 && (
            <>
              <ul className={s.List}>
                {hits.map(hit => (
                  <ImageGalleryItem key={hit.id} img={hit.webformatURL} />
                ))}
              </ul>
              <Loader />
            </>
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }

    if (status === 'resolved') {
      return (
        <>
          {total === 0 && (
            <p>No results were found for {query.toUpperCase()}</p>
          )}

          {total > 0 && (
            <p>
              {query.toUpperCase()}: total {total} images found
            </p>
          )}

          <ul className={s.List}>
            {hits.map(hit => (
              <ImageGalleryItem
                key={hit.id}
                img={hit.webformatURL}
                largeImg={hit.largeImageURL}
                query={query}
                showLargeImg={showLargeImg}
              />
            ))}
          </ul>

          {hits.length > 0 && (
            <p>
              Total images shown: {hits.length} from {total}
            </p>
          )}
          {hits.length > 0 && hits.length < total && (
            <Button handleButtonLoadMore={handleButtonLoadMore} />
          )}
        </>
      );
    }
  }
}
