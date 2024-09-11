import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            marginTop: 5,
            fontFamily: "k2d",
            fontSize: 15,
          }}
        >
          Welcomeeee to wow wow wow
        </Text>
        <Text
          style={{
            marginTop: -5,
            fontFamily: "k2d-bold",
            fontSize: 20,
          }}
        >
          {user?.fullName}
        </Text>
      </View>
      <Image
        source={{
          uri: user?.imageUrl,
        }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
        }}
      ></Image>
    </View>
  );
}
