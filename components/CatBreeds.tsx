import { useState } from 'react';
import { useQuery } from 'react-query';
import { Breed, Cat } from '../types/types';
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

  const {
    isLoading: isCatsLoading,
    isError: isCatsError,
    error: catsError,
    data: catsData,
  } = useQuery<Cat[]>(
    ['catsByBreed', selectedBreed?.id],
    async () => {
      const response = await fetch(`/api/cat/breeds/${selectedBreed?.id}`);
      if (!response.ok) {
        throw new Error(`Failed to get cats for breed: ${selectedBreed?.name}`);
      }
      return response.json();
    },
    { enabled: Boolean(selectedBreed) }
  );

  // TODO handle loading and error more gracefully
  if (isCatBreedsLoading) return <p>Loading...</p>;

  return (
    <section className="w-full md:w-1/2 p-6 mt-4 mb-4">
      <h2 className="text-5xl mb-4 text-orange-500">Cat Breeds</h2>

      <BreedsDropdown
        breeds={catBreedsData || []}
        setSelectedBreed={setSelectedBreed}
      />

      {/* TODO make <Cat /> card component */}
      <h3 className="text-3xl">{selectedBreed?.name}</h3>
      <section className="flex">
        {catsData?.map((cat, i) => {
          return (
            <article key={cat.id}>
              <picture className="block max-w-md">
                <img
                  src={cat.url}
                  alt={`${selectedBreed?.name} Cat - No ${i}`}
                  className="max-w-full"
                />
              </picture>
            </article>
          );
        })}
      </section>
    </section>
  );
};

export default CatBreeds;
