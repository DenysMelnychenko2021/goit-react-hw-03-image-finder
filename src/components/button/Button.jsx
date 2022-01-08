import PropTypes from 'prop-types';

export const Button = ({ handleButtonLoadMore }) => {
  return (
    <button type="button" onClick={() => handleButtonLoadMore()}>
      Load more
    </button>
  );
};

Button.propTypes = {
  handleButtonLoadMore: PropTypes.func.isRequired,
};
