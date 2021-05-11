import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import firebase from "../components/firebaseconnect";
import { Image } from 'react-bootstrap';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const Page = () => {
  const [search, setSearch] = useState("");
  const [fav, setFav] = useState([]);

  const searchChange = (event) => {
    setSearch(event.target.value);
  }

  const removeFav = (event) => {
    const collection = firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid);
    collection.update({
      favorite: firebase.firestore.FieldValue.arrayRemove(event.target.name)
    });
    fetchFavs();
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

  const fetchFavs = async () => {
    if (firebase.auth().currentUser) {
        const doc = await firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid).get();
        setFav((doc.data() || "")['favorite']);
    }
  }

  fetchFavs();
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
          Seznam oblíbených pokémonů
        </h1>
        <input className={styles.search} onChange={searchChange} placeholder="Vyhledávání" />
        <div className={styles.flexdiv}>
        {
          fav.map((item: string, key) => {
            if (item.split(";")[0].startsWith(search))
              return <div key={key} className={styles.flexcontainer + " " + styles.pokecard}>
                <Image src={"./" + item.split(";")[0] + ".png"} width="73%" />
                <div className={styles.pokecontainer}>
                  <h4><b>{item.split(";")[0][0].toUpperCase() + item.split(";")[0].substring(1)}</b></h4>
                  <p>{item.split(";")[2]}. generace</p>
                </div>
                <button name={item} onClick={removeFav} className={styles.nofavoritebutton} type="button">Odebrat</button>
              </div>
          })
        }
        </div>
      </main>
    </div>
  )
}

export default Page