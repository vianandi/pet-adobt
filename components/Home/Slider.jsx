import { View, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function Slider() {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    GetSlider();
  }, []);

  const GetSlider = async () => {
    setSlider([]);
    const snapshot = await getDocs(collection(db, "Slider"));
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setSlider((slider) => [...slider, doc.data()]);
    });
  };

  return (
    <ScrollView>
      <View>
        {slider.map((item, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Image source={{ uri: item.imageUrl }} style={styles.sliderImage} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    backgroundColor: "blue",
  },
});
