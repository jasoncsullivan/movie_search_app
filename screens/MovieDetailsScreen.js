import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

import { REACT_NATIVE_OMDB_API_KEY } from "@env";

const MovieDetailsScreen = ({ navigation, route }) => {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieObj } = route.params;

  useEffect(() => {
    const getMovieDetails = async () => {
      const uri = `http://www.omdbapi.com/?i=${movieObj.imdbID}&apikey=${REACT_NATIVE_OMDB_API_KEY}`;
      const res = await fetch(uri);
      const results = await res.json();

      if (results && results.Response === "True") {
        const resultsTrimmed = Object.assign({}, results);
        delete resultsTrimmed.Poster;
        delete resultsTrimmed.Response;
        delete resultsTrimmed.Type;
        delete resultsTrimmed.Ratings;

        setMovieDetails(resultsTrimmed);
      }
    };
    getMovieDetails();
  }, []);

  return (
    <View style={styles.detailsContainer}>
      <Image style={styles.moviePoster} source={{ uri: movieObj.Poster }} />

      {movieDetails && (
        <FlatList
          data={Object.entries(movieDetails).map((tup, i) => {
            return { key: i.toString(), val: `${tup[0]}: ${tup[1]}` };
          })}
          renderItem={({ item }) => <Text>{item.val}</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  moviePoster: { height: 200, width: 200 },
});

export default MovieDetailsScreen;
