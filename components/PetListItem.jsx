import React from "react";
import { View, Text, Image } from "react-native";

export default function PetListItem({ pet }) {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        width: 150,
      }}
    >
      <Image
        source={{ uri: pet.imageUrl }}
        style={{
          width: 140,
          height: 100,
        }}
      />
      <Text>{pet?.name}</Text>
    </View>
  );
}
