import { Component } from 'react';

import { ImageGalleryItem } from 'components/imageGalleryItem';

const BASE_URL = 'https://pixabay.com/api/';
const point = '&image_type=photo&orientation=horizontal';
const KEY = '&key=24108487-0821a8cfb30bd7537d5ee3667';

export class ImageGallery extends Component {
  state = {
    hits: null,
    total: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps) {
    const { query } = this.props;

    if (prevProps.query !== query) {
      console.log('prevProps', prevProps.query);
      console.log('this.props', query);

      this.setState({ loading: true, hits: null });

      setTimeout(() => {
        fetch(`${BASE_URL}?q=${query}&page=1${KEY}${point}&per_page=12`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(
              new Error(`По запросу ${query.toUpperCase()} ничего не найдено`),
            );
          })
          .then(api => this.setState({ hits: api.hits, total: api.total }))
          .catch(error => this.setState({ error }))
          .finally(this.setState({ loading: false }));
      }, 2000);
    }
  }

  render() {
    console.log(this.state.total);
    console.log(this.props.query);
    const { query } = this.props;
    const { hits, total, loading, error } = this.state;
    return (
      <div>
        {error && <p>{error.message}</p>}

        {!query && <p>Введите запрос</p>}

        {loading && <p>Загружаем...</p>}

        {total === 0 && <p>Ничего не найдено</p>}
        {hits && total > 0 && (
          <>
            <p>
              {query}: всего найдено {total} картинок
            </p>
            <ul>
              {hits.map(hit => (
                <ImageGalleryItem
                  key={hit.id}
                  img={hit.webformatURL}
                  query={query}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}
