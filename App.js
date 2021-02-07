import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "./screens/SearchScreen.js";
import MovieDetailsScreen from "./screens/MovieDetailsScreen.js";

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer style={styles.container}>
        <MyStack />
      </NavigationContainer>
    );
  }
}

const MyStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={"Movie Search"}>
      <Stack.Screen name="Movie Search" component={SearchScreen} />
      <Stack.Screen name="Movie Details" component={MovieDetailsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
