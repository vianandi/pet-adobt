import { Text, View, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../config/FirebaseConfig";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import color from "../constants/Colors";

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategories([]);
    const snapshot = await getDocs(collection(db, "Category"));
    const storage = getStorage();
    const categoriesWithUrls = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const imageUrl = await getDownloadURL(ref(storage, data.imageUrl));
        return { ...data, imageUrl };
      })
    );
    setCategories(categoriesWithUrls);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text style={{ fontFamily: "k2d-medium", fontSize: 20 }}>Category</Text>
        <FlatList
          data={categories}
          numColumns={4}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
              }}
            >
              <View style={styles.container}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: 40, height: 40 }}
                />
              </View>
              <Text
              style={{
                textAlign: "center",
                fontFamily: "k2d-medium",
                marginTop: -4,
              }}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.BLACK,
    padding: 10,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 5,
  },
});
