import React, { useState, useEffect } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import PetListItem from "./PetListItem";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function PetListByCategory() {
  const [PetList, setPetList] = useState([]);

  useEffect(() => {
    GetPetList("Bird");
  }, []);

  const GetPetList = async (category) => {
    setPetList([]);
    let q;
    if (category) {
      q = query(collection(db, "Pets"), where("category", "==", category));
    } else {
      q = query(collection(db, "Pets"));
    }
    const querySnapshot = await getDocs(q);
    const storage = getStorage();

    const petListWithUrls = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const petData = doc.data();
        const imageRef = ref(storage, petData.imageUrl);
        const url = await getDownloadURL(imageRef);
        return { ...petData, imageUrl: url };
      })
    );

    setPetList(petListWithUrls);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Category onCategorySelect={(value) => GetPetList(value)} />
      <FlatList
        data={PetList}
        style={{
          marginTop: 10,
          marginBottom: 10, 
          flex: 1, 
        }}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </GestureHandlerRootView>
  );
}
