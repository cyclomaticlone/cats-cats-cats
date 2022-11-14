import { useQuery } from 'react-query';

const RandomCat = () => {
  const { isFetching, isError, error, data, refetch } = useQuery(
    'randomCat',
    async () => {
      const response = await fetch('/api/cat/random');
      if (!response.ok) {
        throw new Error('Failed to get random cat.');
      }
      return response.json();
    }
  );

  // TODO handle loading and error more gracefully

  // if (isFetching) return <p>Loading...</p>;
  return (
    <section className="w-full md:w-1/2 p-6 mt-4 mb-4 md:border-r-2 border-orange-500">
      <h2 className="text-5xl mb-4 text-orange-500">Random Cat</h2>
      <button
        type="button"
        className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black border-2 px-3 py-1 w-full mb-4"
        onClick={() => refetch()}
        disabled={isFetching}
      >
        {isFetching ? 'Getting a cat...' : 'Get Another'}
      </button>
      {/* TODO make <Cat /> card component */}
      {!isFetching && (
        <article>
          <picture className="block w-full">
            <img
              src={data.url}
              alt={`Random Cat - ${data.name || data.id}`}
              className="w-full"
            />
          </picture>
        </article>
      )}
    </section>
  );
};

export default RandomCat;
