import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import {darkMode, darkModeUseEffect, fetchFavs, removeFav, searchChange} from "../components/functions";

const Page = () => {
  const [search, setSearch] = useState("");
  const [fav, setFav] = useState([]);

  const [dark, setDark] = useState(styles.mainwhite);
  darkModeUseEffect(setDark);

  fetchFavs(setFav);
  return (
    <div className={styles.container}>
      <Head>
        <title>Úvodní stránka</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <Menu />
      <main className={dark}>
        <button className={styles.buttontoggle} onClick={() => {setDark(darkMode());}}>Dark Mode</button>
        <h1 className={"display-1 " + styles.title}>
          Seznam oblíbených pokémonů
        </h1>
        <input className={styles.search} onChange={(event)=>searchChange(event, setSearch)} placeholder="Vyhledávání" />
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
                <button name={item} onClick={(event)=>{removeFav(event, setFav)}} className={styles.nofavoritebutton} type="button">Odebrat</button>
              </div>
          })
        }
        </div>
      </main>
    </div>
  )
}

export default Page