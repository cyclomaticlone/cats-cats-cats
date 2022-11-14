import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import RandomCat from '../components/RandomCat';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <h1>Cats Cats Cats</h1>
        <RandomCat />
        {/* <CatBreeds /> */}
      </div>
    </QueryClientProvider>
  );
}
