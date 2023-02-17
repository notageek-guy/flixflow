import React, { useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "@/firebase/appClient";
import Layout from "@/components/Layout";
import { Container, SimpleGrid, Image } from "@chakra-ui/react";
function WatchList() {
  const favoriteRef = collection(db, "favorites");
  const [favorites, setFavorites] = useState<any[]>([]);
  useEffect(() => {
    const getFavorites = async () => {
      try {
        await getDocs(favoriteRef).then((QuerySnapshot) => {
          const newData = QuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setFavorites(newData);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(favorites);
  return (
    <Layout>
      <Container maxW="container.xl">
        <div className="max-w-sm">
          <h1 className="text-5xl font-bold sm:text-6xl">
            {favorites.length > 0 ? "Favorites" : "No Favorites"}
          </h1>
        </div>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px" mt="4">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="flex flex-col items-center justify-center"
            >
              <Image
                src={favorite.image}
                alt={favorite.title}
                maxW="300px"
                maxH="300px"
                className={` rounded-lg shadow-2xl opacity-80 hover:opacity-100 
                transition-all duration-300
                `}
              />
              <h1 className="py-2 text-2xl font-bold text-center">
                {favorite.title}
              </h1>
            </div>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}

export default React.memo(WatchList);
