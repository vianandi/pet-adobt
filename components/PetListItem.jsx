import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

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
        width:150,
      }}
    >
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{
          width: 140,
          height: 50,
          backgroundColor: Colors.PRIMARY,
        }}
      />
      <Text>{pet?.name}</Text>
    </View>
  );
}
