import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../config/FirebaseConfig";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import color from "../constants/Colors";

export default function Category({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
        console.log("Image URL path:", data.imageUrl); // Add this to check if URLs are correct
        const imageUrl = await getDownloadURL(ref(storage, data.imageUrl));
        return { ...data, imageUrl };
      })
    );
    setCategories(categoriesWithUrls);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: "k2d-medium", fontSize: 20 }}>Category</Text>
        <FlatList
          data={categories}
          numColumns={4}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                setSelectedCategory(item.name);
                onCategorySelect(item.name);
              }}
            >
              <View
                style={[
                  styles.container,
                  selectedCategory === item.name
                    ? { backgroundColor: color.PRIMARY }
                    : { backgroundColor: color.CATEGORY },
                ]}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: 40, height: 40 }}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "k2d-medium",
                  marginTop: -3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.CATEGORY,
    padding: 10,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    margin: 5,
  },
});
