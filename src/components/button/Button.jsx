export const Button = ({ handleButtonLoadMore }) => {
  return (
    <button type="button" onClick={() => handleButtonLoadMore()}>
      Load more
    </button>
  );
};
