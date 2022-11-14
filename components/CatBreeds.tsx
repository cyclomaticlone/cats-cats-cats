import { useState } from 'react';
import { useQuery } from 'react-query';
import { Breed } from '../types/types';
import BreedsDropdown from './BreedsDropdown';

const CatBreeds = () => {
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const {
    isLoading: isCatBreedsLoading,
    isError,
    error,
    data: catBreedsData,
  } = useQuery<Breed[]>('catBreeds', async () => {
    const response = await fetch('/api/cat/breeds');
    if (!response.ok) {
      throw new Error('Failed to get cat breeds.');
    }
    return response.json();
  });

  // TODO handle loading and error more gracefully
  if (isCatBreedsLoading) return <p>Loading...</p>;

  return (
    <section>
      <h2 className="text-5xl">Cat Breeds</h2>
      {/* {catBreedsData &&
        catBreedsData.map((breed: Breed) => (
          <h3 key={breed.id}>{breed.name}</h3>
        ))} */}
      {selectedBreed?.name}

      <BreedsDropdown
        breeds={catBreedsData || []}
        setSelectedBreed={setSelectedBreed}
      />

      {/* TODO make <Cat /> card component */}
      <picture>
        {/* <img src={data.url} alt={`Random Cat - ${data.name || data.id}`} /> */}
      </picture>
    </section>
  );
};

export default CatBreeds;
