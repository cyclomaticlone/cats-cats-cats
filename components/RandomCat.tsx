import { useQuery } from 'react-query';

const RandomCat = () => {
  const { isLoading, isError, error, data, refetch } = useQuery(
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

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <h2>Random Cat</h2>
      <button type="button" onClick={() => refetch()}>
        Get Another
      </button>
      {/* TODO make <Cat /> card component */}
      <picture>
        <img src={data.url} alt={`Random Cat - ${data.name || data.id}`} />
      </picture>
    </div>
  );
};

export default RandomCat;
