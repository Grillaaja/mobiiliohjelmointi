import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList, Alert } from 'react-native';
import * as firebase from 'firebase';
import { useState, useEffect } from 'react';

export default function App() {

  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [user, setUser] = useState("");
  const [items, setItems] = useState([]);

  
  if (firebase.apps.length === 0) {
    firebase.initializeApp({
    apiKey: "AIzaSyCSJnw3_lIw4uzWbGVvo3Vu52OOD7tkLUo",
    appId: "1:675052255506:web:bc54d003e8c54cbe555bcb",
    projectId: "ruokalistasovellus",
    authDomain: "ruokalistasovellus.firebaseapp.com",
    databaseURL: "https://ruokalistasovellus-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "ruokalistasovellus.appspot.com",
    messagingSenderId: "675052255506",
    measurementId: "G-CBNCTSEKEP"});
  }


  useEffect(() => {
    firebase.database().ref("items").on("value", snapshot => {
      const data = snapshot.val();
      const prods = Object.values(data);
      setItems(prods);
    })
  });

  const buttonPressed = () => {
    if (product){
      firebase.database().ref("items").push(
        {"product" : product}
      );
    }else{
      Alert.alert("Error", "Type in a product before continuing");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
      style={{width: 200, borderColor: "gray", borderWidth: 1}}
      onChangeText={product => setProduct(product)}
      value={product}/>
      <Button 
      onPress={buttonPressed}
      title="Lisää"/>
      <FlatList data={items} renderItem={({item}) =>
      <Text>{item.key}</Text>}
      keyExtractor={(item, index) => index.toString()}/>
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
