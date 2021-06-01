import { useEffect } from 'react';

import firebase from "./firebaseconnect";
import "firebase/auth";
import "firebase/firestore";

import { useApollo } from '../lib/apollo';

import styles from '../styles/Home.module.css';

import {query} from './query';

import messagesCz from "../components/translations/cz.json";
import messagesEn from "../components/translations/en.json";

export const getLanguageText = (languageCode: string) => {
  if(languageCode == "cz"){
    return messagesCz;
  }
  else if(languageCode == "en"){
    return messagesEn;
  }
  else "";
}

//Vyhledávání
export const searchChange = (event, setSearch) => {
  setSearch(event.target.value);
}

//Přihlášení
export const isLogged = () => {
    // if(firebase.auth().currentUser) return true;
    // else return false;

    //return firebase.auth().currentUser ? true : false;

    return !!firebase.auth().currentUser;
}

//Dark Mode
export const getDarkMode = () => {
  console.log(localStorage.getItem("dark"));
  if (localStorage.getItem("dark")) {
    localStorage.removeItem("dark");
    return(styles.mainwhite);
  }
  else {
    localStorage.setItem("dark", "1");
    return(styles.maindark);
  }
}
export const useDarkMode = (setDark) => {
  useEffect(() => {
    if (localStorage.getItem("dark")) {
      setDark(styles.maindark);
    }
    else {
      setDark(styles.mainwhite);
    }
  })
}

//Pokelist
export const getPokeList = async (setData, setLoad) => {
  const response = await useApollo(null).query({ query });
  setData(response.data.pokemon_v2_pokemon);
  setLoad(true);
  console.log("API items loaded");
}

//Favorites
export const fetchFavs = async (setFav) => {
  if (isLogged()) {
      const doc = await firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid).get();
      setFav((doc.data() || "")['favorite']);
  }
}
export const setFavorite = (event) => {
  if (isLogged()) {
    const collection = firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid);
    if (event.target.className === styles.favoritebutton) {
      event.target.className = styles.nofavoritebutton;
      collection.update({
        favorite: firebase.firestore.FieldValue.arrayRemove(event.target.id)
      });
    }
    else {
      collection.update({
        favorite: firebase.firestore.FieldValue.arrayUnion(event.target.id)
      });
      event.target.className = styles.favoritebutton;
      //event.target.disabled = true;
    }
  }
  else alert("Pro tuto akci musíš být přihlášen.");
}
export const removeFavorite = (event, setFav) => {
  const collection = firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid);
  collection.update({
    favorite: firebase.firestore.FieldValue.arrayRemove(event.target.name)
  });
  fetchFavs(setFav);
}