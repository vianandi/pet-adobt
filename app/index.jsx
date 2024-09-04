import { Text, View, Pressable } from "react-native";
import { Link, Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const { user } = useUser();

  if (user === undefined) {
    // You might want to show a loading spinner here instead of immediately returning null
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? (
        <Redirect href="/(tabs)/home" />
      ) : (
        <Redirect href="/login" />
      )}

      <Link href="/login">
        <Text
          style={{
            fontFamily: "k2d-bold",
            fontSize: 40,
          }}
        >
          YTTA.
        </Text>
      </Link>
    </View>
  );
}
