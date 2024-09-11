import { View } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";

export default function home() {
  return (
    <View
      style={{
        padding: 20,
        marginTop: 22,
        flex: 1,
      }}
    >
      {/* Header */}
      <Header></Header>
      {/* Slider */}
      <Slider></Slider>
      {/* Category */}
      {/* List of Pets */}
      {/* Add New Pets options */}
    </View>
  );
}
