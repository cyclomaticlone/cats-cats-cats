import { useState } from "react";
import { useQuery } from "react-query";
import { Breed, Cat as CatType } from "../types/types";
import BreedsDropdown from "./BreedsDropdown";
import Cat from "./Cat";

const CatBreeds = () => {
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const {
    isLoading: isCatBreedsLoading,
    isError,
    error,
    data: catBreedsData,
  } = useQuery<Breed[]>("catBreeds", async () => {
    const response = await fetch("/api/cat/breeds");
    if (!response.ok) {
      throw new Error("Failed to get cat breeds.");
    }
    return response.json();
  });

  const {
    isLoading: isCatsLoading,
    isError: isCatsError,
    error: catsError,
    data: catsData,
  } = useQuery<CatType[]>(
    ["catsByBreed", selectedBreed?.id],
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

  return (
    <section className="w-full p-6 mt-4 mb-4 max-w-4xl">
      <h2 className="text-5xl mb-4 text-orange-500">Cat Breeds</h2>

      <BreedsDropdown
        breeds={catBreedsData || []}
        key={catBreedsData?.length}
        setSelectedBreed={setSelectedBreed}
        isLoading={isCatBreedsLoading}
      />

      <section className="mb-6">
        <h3 className="text-3xl mb-3 text-orange-500">
          {selectedBreed ? selectedBreed.name : "No breed selected"}
        </h3>
        {selectedBreed && (
          <>
            <p className="text-l mb-2 text-orange-500">
              {selectedBreed.description}
            </p>
            {selectedBreed.alt_names && (
              <p className="text-m mb-2 text-orange-500">
                Also known as: {selectedBreed.alt_names}
              </p>
            )}
            {selectedBreed.wikipedia_url && (
              <a
                className="text-l mb-4 inline-block mr-4 font-bold text-orange-500 underline hover:text-orange-600"
                href={selectedBreed.wikipedia_url}
              >
                → Wikipedia
              </a>
            )}
            {selectedBreed.cfa_url && (
              <a
                className="text-l mb-4 inline-block mr-4 font-bold text-orange-500 underline hover:text-orange-600"
                href={selectedBreed.cfa_url}
              >
                → CFA
              </a>
            )}
          </>
        )}
      </section>

      <section className="flex flex-wrap">
        {(isCatsLoading || !catsData ? Array(6) : catsData).map((cat) => {
          return <Cat key={cat.id} cat={cat} className="w-1/2" />;
        })}
      </section>
    </section>
  );
};

export default CatBreeds;
