import { useQuery } from "react-query";
import { Cat as CatType } from "../types/types";
import Cat from "./Cat";

const RandomCat = () => {
  const { isFetching, isError, error, data, refetch } = useQuery<CatType>(
    "randomCat",
    async () => {
      const response = await fetch("/api/cat/random");
      if (!response.ok) {
        throw new Error("Failed to get random cat.");
      }
      return response.json();
    }
  );

  // TODO handle loading and error more gracefully

  // if (isFetching) return <p>Loading...</p>;
  return (
    <section className="w-full md:w-auto p-6 mt-4 mb-4 md:pl-0 md:pr-0 md:ml-6 md:mr-6 md:border-b-2 border-orange-500 ">
      <h2 className="text-5xl mb-4 text-orange-500">Random Cat</h2>
      <div className="md:w-1/2 max-w-md md:pr-2">
        <button
          type="button"
          className="border-orange-500 text-lg text-orange-500 hover:bg-orange-500 hover:text-black border-2 px-3 py-1 w-full mb-4"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Getting a cat..." : "Get Another"}
        </button>
        <Cat cat={data} />
      </div>
    </section>
  );
};

export default RandomCat;
