import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useApollo } from '../lib/apollo';
import firebase from "../components/firebaseconnect";
import Popup from 'reactjs-popup';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

type V2Gen = {
  generation_id: Number;
}

type Item = {
  name: string;
  id: Number;
  pokemon_v2_pokemonspecy: V2Gen;
  weight: number;
  height: number;
  base_experience: number;
};

const query = gql`
  query allPokemons {
    pokemon_v2_pokemon(order_by: {id: asc}) {
      name
      id
      pokemon_v2_pokemonspecy {
        generation_id
      }
      weight
      height
      base_experience
    }
  }
`;

const Page = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");

  const getPokeList = async () => {
    const response = await useApollo(null).query({ query });
    setData(response.data.pokemon_v2_pokemon);
    setLoad(true);
    console.log("API items loaded");
  }

  const [dark, setDark] = useState(styles.mainwhite);

  useEffect(() => {
    if (localStorage.getItem("dark")) {
      setDark(styles.maindark);
    }
    else {
      setDark(styles.mainwhite);
    }
  })

  const darkMode = () => {
    console.log(localStorage.getItem("dark"));
    if (localStorage.getItem("dark")) {
      localStorage.removeItem("dark");
      setDark(styles.mainwhite);
    }
    else {
      localStorage.setItem("dark", "1");
      setDark(styles.maindark);
    }
  }

  const searchChange = (event: any) => {
    setSearch(event.target.value);
  }

  const favorite = (event) => {
    if (firebase.auth().currentUser) {
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

  getPokeList();

  return (
    <div className={styles.container}>
      <Head>
        <title>Úvodní stránka</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <Menu />
      <main className={dark}>
        <button className={styles.buttontoggle} onClick={darkMode}>Dark Mode</button>
        <h1 className={"display-1 " + styles.title}>
          Seznam všech pokémonů
        </h1>
        <input className={styles.search} onChange={searchChange} placeholder="Vyhledávání" />
        <div className={styles.flexdiv}>
          {load &&
            data.map((item: Item, key) => {
              if (item.name.startsWith(search))
                return <Popup
                trigger={<div key={key} className={styles.flexcontainer + " " + styles.pokecard}>
                <Image src={"./" + item.name + ".png"} width="73%" />
                <div className={styles.pokecontainer}>
                  <h4><b>{item.name[0].toUpperCase() + item.name.substring(1)}</b></h4>
                  <p>{item.pokemon_v2_pokemonspecy.generation_id}. generace</p>
                </div>
              </div>}
                modal
                nested
              >
                {close => (
                  <div className={styles.modal}>
                    <button className={styles.close} onClick={close}>
                      &times;
                    </button>
                    <div className={styles.header}> {item.name[0].toUpperCase() + item.name.substring(1)} <Image src={"./" + item.name + ".png"} width="128px" /> </div>
                    <div className={styles.content}>
                      {' '}
                      {item.pokemon_v2_pokemonspecy.generation_id}. generace
                      <br /><br />
                      Zkušenosti: {item.base_experience} 
                      <br /><br />
                      Váha: {item.weight / 10} kg
                      <br />
                      Výška: {item.height * 10} cm
                      <br /><br />
                      <button id={item.name + ";" + item.id + ";" + item.pokemon_v2_pokemonspecy.generation_id} className={styles.nofavoritebutton} onClick={favorite} type="button">Do oblíbených</button>
                    </div>
                  </div>
                )}
              </Popup>
            })
          }
          {!load &&
            <p>Loading...</p>
          }
        </div>
      </main>
    </div>
  )
}

export default Page