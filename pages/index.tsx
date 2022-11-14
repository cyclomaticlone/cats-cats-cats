import Head from "next/head";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import RandomCat from "../components/RandomCat";
import CatBreeds from "../components/CatBreeds";

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
      <Head>
        <title>cats cats cats</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <main className="flex flex-col md:flex-row min-h-screen border-2 md:border-0 border-orange-500">
          <header className="p-2 pb-8 md:p-4 pt-0 w-full md:w-1/5 mt-4 md:mb-4 border-b-2 md:border-b-0 md:border-r-2 border-orange-500 ">
            <h1 className="text-7xl font-bold underline decoration-wavy text-orange-500 leading-[1.1] sticky top-0">
              cats cats cats
            </h1>
          </header>
          <section className="flex flex-wrap md:flex-col w-full md:w-4/5">
            <RandomCat />
            <CatBreeds />
          </section>
        </main>
      </QueryClientProvider>
    </>
  );
}
