import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ img, largeImg, query, showLargeImg }) => (
  <li className={s.Item}>
    <img
      src={img}
      width="290"
      alt={query}
      onClick={() => showLargeImg(largeImg)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string,
  query: PropTypes.string,
  showLargeImg: PropTypes.func,
};
