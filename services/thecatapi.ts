import fetch from "node-fetch";
const headers = { "x-api-key": process.env.THE_CAT_API_KEY || "" };

const ROOT_URL = "https://api.thecatapi.com/v1";

export const getRandomCat = () =>
  fetch(`${ROOT_URL}/images/search`, {
    headers,
  });

export const getBreeds = () =>
  fetch(`${ROOT_URL}/breeds`, {
    headers,
  });

export const getCatsByBreedId = (breedId: string, numberToGet: number = 6) =>
  fetch(
    `${ROOT_URL}/images/search?limit=${numberToGet.toString()}&breedIds=${breedId}`,
    {
      headers,
    }
  );
