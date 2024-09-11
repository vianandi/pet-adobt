import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

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
    // <ScrollView>
    //   <View>
    //     {slider.map((item, index) => (
    //       <View key={index} >
    //         <Image source={{ uri: item.imageUrl }} style={styles.sliderImage} />
    //       </View>
    //     ))}
    //   </View>
    // </ScrollView>
    <GestureHandlerRootView
    style={{
        marginTop:15,
    }}>
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.imageUrl }} style={styles.sliderImage} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.8,
    height: 170,
    borderRadius: 20,
    marginRight:15,
  },
});
