const headers = { 'x-api-key': process.env.THE_CAT_API_KEY || '' };

const ROOT_URL = 'https://api.thecatapi.com/v1';

export const getRandomCat = () =>
  fetch(`${ROOT_URL}/images/search`, {
    headers,
  });

