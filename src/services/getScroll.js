export const getScroll = array => {
  const firstImg = document.querySelector(
    `[src="${array[array.length - 12].webformatURL}"]`,
  );
  firstImg.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
