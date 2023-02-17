import Layout from "@/components/Layout";
import { Container, Image, Input, SimpleGrid } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/appClient";
import Head from "next/head";
export default function Search() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [filterMovies, setFilterMovies] = useState<any>([]);
  useEffect(() => {
    const getMovies = async () => {
      const moviesRef = collection(db, "movies");

      try {
        await getDocs(moviesRef).then((QuerySnapshot) => {
          const newData = QuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setMovies(newData);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, []);

  const handleSearch = useCallback(() => {
    const filterMovies = loading
      ? []
      : movies.filter((movie: any) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        );
    setFilterMovies(filterMovies);
  }, [search, movies, loading]);

  return (
    <Layout>
      <Head>
        <title>Search</title>
      </Head>
      <Container maxW="container.xl">
        <div className="max-w-sm">
          <h1 className="text-6xl font-bold">Search</h1>
        </div>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleSearch}
          value={search}
          placeholder="Search"
          className="mt-4"
          variant="filled"
          size="lg"
        />
        <div
          className={`mt-4 max-w-7xl
          transition-all duration-300
          sm:mt-8
        `}
        >
          <h1 className="text-6xl font-bold">
            {filterMovies.length > 0 ? "Results" : "No Results"}
          </h1>
          <SimpleGrid columns={[1, 2, 3]} spacing="40px" mt="4">
            {filterMovies.map((movie: any) => (
              <div key={movie.id} className="flex flex-col items-center">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  maxW="300px"
                  maxH="300px"
                  className={`rounded-lg shadow-md opacity-80 hover:opacity-100
                    transition-all duration-300
                    `}
                />
                <h1 className="py-2 text-2xl font-bold text-center">
                  {movie.title}
                </h1>
              </div>
            ))}
          </SimpleGrid>
        </div>
      </Container>
    </Layout>
  );
}
