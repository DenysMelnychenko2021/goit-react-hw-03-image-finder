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
