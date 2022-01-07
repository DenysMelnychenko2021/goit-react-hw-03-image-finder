const API = {
  BASE_URL: 'https://pixabay.com/api/',
  point: '&image_type=photo&orientation=horizontal',
  KEY: '&key=24108487-0821a8cfb30bd7537d5ee3667',
};
const { BASE_URL, point, KEY } = API;

async function fetchImages(query, page) {
  const URL = `${BASE_URL}?q=${query}&page=${page}${KEY}${point}&per_page=12`;

  const response = await fetch(URL);
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(
    new Error(
      `Something went wrong for ${query}, please enter another request`,
    ),
  );
}
const api = {
  fetchImages,
};
export default api;
