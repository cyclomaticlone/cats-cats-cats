import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import RandomCat from '../components/RandomCat';
import CatBreeds from '../components/CatBreeds';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Home() {
  return (
    <>

      <QueryClientProvider client={queryClient}>
        <main className={styles.container}>
          <h1 className="text-7xl font-bold">Cats Cats Cats</h1>
          <RandomCat />
          <CatBreeds />
        </main>
      </QueryClientProvider>
    </>
  );
}
