import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { REACT_NATIVE_OMDB_API_KEY } from "@env";

const SearchScreen = ({ navigation }) => {
  const [moviePrefix, setMoviePrefix] = useState("");
  const [movieResultArr, setMovieResultArr] = useState([]);

  const searchMovieEntries = async () => {
    console.log("searching movie prefix: ", moviePrefix);

    let fullList = [];

    // NOTE iteration accounts for max of 100 10-length pages, per API spec
    for (let i = 1; i < 101; i++) {
      const uri = `http://www.omdbapi.com/?s=${encodeURI(
        moviePrefix
      )}&page=${i}&apikey=${REACT_NATIVE_OMDB_API_KEY}`;
      const res = await fetch(uri);
      const results = await res.json();
      if (results && results.Response === "True") {
        fullList = fullList.concat(results.Search);
      } else {
        break;
      }
    }

    setMovieResultArr(fullList);
  };

  const viewMovieDetails = (movieObj) => {
    setMoviePrefix("");
    setMovieResultArr([]);
    navigation.navigate("Movie Details", {
      movieObj,
    });
  };

  return (
    <KeyboardAvoidingView style={styles.searchContainer}>
      <TextInput
        style={styles.movieInput}
        onChangeText={(text) => setMoviePrefix(text)}
        value={moviePrefix}
      />

      <Button
        onPress={searchMovieEntries}
        title="Search"
        color="#841584"
        disabled={!moviePrefix}
      />

      {movieResultArr.length > 0 && moviePrefix.length ? (
        <FlatList
          data={movieResultArr.map((movieObj, i) => {
            return { key: i.toString(), title: movieObj.Title, obj: movieObj };
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieButton}
              onPress={() => viewMovieDetails(item.obj)}
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <></>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  movieInput: { height: 40, width: 200, borderColor: "gray", borderWidth: 1 },
  movieButton: {},
});

export default SearchScreen;
