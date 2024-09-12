import React, { useState, useEffect } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import PetListItem from "./PetListItem";

export default function PetListByCategory() {
  const [PetList, setPetList] = useState([]);

  useEffect(() => {
    GetPetList("Bird");
  }, []);

  const GetPetList = async (category) => {
    setPetList([]);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setPetList((PetList) => [...PetList, doc.data()]);
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Category onCategorySelect={(value) => GetPetList(value)} />
      <FlatList
        data={PetList}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
        numColumns={2} // Add this line to set the number of columns
        keyExtractor={(item, index) => index.toString()}
      />
    </GestureHandlerRootView>
  );
}
