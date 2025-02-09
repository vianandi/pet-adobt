import { View } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "../../components/PetListByCategory";

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
      {/* List of Pets */}
      <PetListByCategory></PetListByCategory>
      {/* Add New Pets options */}
    </View>
  );
}
