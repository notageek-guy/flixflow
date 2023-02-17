import Layout from "@/components/Layout";
import { Suspense, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/appClient";
import { Image, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
interface Movie {
  title: string;
  description: string;
  rating: number;
  id: string;
  image: string;
  movieTrailer: string;
  releaseDate: string;
}

interface MovieListProps {
  movies: Movie[];
}
import { useRouter } from "next/router";
import Head from "next/head";

export default function MovieList() {
  const [movies, setMovies] = useState<any>([]);
  const router = useRouter();

  const goToMovie = (
    id: string,
    data: {
      title: string;
      description: string;
      rating: number;
      id: string;
      image: string;
      movieTrailer: string;
      releaseDate: string;
    }
  ) => {
    router.push({
      pathname: `/movies/${id}`,
      query: {
        data: JSON.stringify({
          title: data.title,
          description: data.description,
          rating: data.rating,
          id: data.id,
          image: data.image,
          movieTrailer: data.movieTrailer,
          releaseDate: data.releaseDate,
        }),
      },
    });
  };
  const [loading, setLoading] = useState(true);
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

  return (
    <Layout>
      <Head>
        <title>Movie List</title>
      </Head>
      <div className="container px-4 py-16 mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <SimpleGrid columns={[1, 2, 3]} spacing="40px">
            {!loading
              ? movies.map((movie: Movie) => (
                  <div
                    onClick={() => goToMovie(movie.id, movie)}
                    key={movie.id}
                    className={`
                flex flex-col items-center 
                 hover:scale-105 
                transition-all duration-300
                
              `}
                  >
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      maxW="300px"
                      maxH="300px"
                      className={`rounded-lg shadow-md opacity-80 hover:opacity-100
                    transition-all duration-300
                    `}
                    />
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      mt="2"
                      textAlign={["center", "left"]}
                    >
                      {movie.title}
                    </Text>
                  </div>
                ))
              : Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    height="300px"
                    isLoaded={!loading}
                    fadeDuration={0.5}
                  />
                ))}
          </SimpleGrid>
        </Suspense>
      </div>
    </Layout>
  );
}
