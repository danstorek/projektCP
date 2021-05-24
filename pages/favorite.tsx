import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { useContext, useState } from 'react';
import { Image } from 'react-bootstrap';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import {getDarkMode, useDarkMode, fetchFavs, removeFavorite, searchChange} from "../components/functions";

import languageContext from "../components/language";

const Page = () => {
  const [search, setSearch] = useState("");
  const [fav, setFav] = useState([]);

  const langContext = useContext(languageContext);

  const [dark, setDark] = useState(styles.mainwhite);
  useDarkMode(setDark);

  fetchFavs(setFav);
  return (
    <div className={styles.container}>
      <Head>
        <title>Favorite pokemons</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <Menu />
      <main className={dark}>
        <button className={styles.buttontoggle} onClick={() => {setDark(getDarkMode());}}>Dark Mode</button>
        <h1 className={"display-1 " + styles.title}>
        {
          langContext.language === "cz" && "Seznam oblíbených pokémonů"
        }
        {
          langContext.language === "en" && "List of favorite pokemons"
        }
        </h1>
        {
          langContext.language === "cz" && <input className={styles.search} onChange={(event)=>searchChange(event, setSearch)} placeholder="Vyhledávání" />
        }
        {
          langContext.language === "en" && <input className={styles.search} onChange={(event)=>searchChange(event, setSearch)} placeholder="Search" />
        }
        <div className={styles.flexdiv}>
        {
          fav.map((item: string, key) => {
            if (item.split(";")[0].startsWith(search))
              return <div key={key} className={styles.flexcontainer + " " + styles.pokecard}>
                <Image src={"./" + item.split(";")[0] + ".png"} width="73%" />
                <div className={styles.pokecontainer}>
                  <h4><b>{item.split(";")[0][0].toUpperCase() + item.split(";")[0].substring(1)}</b></h4>
                  <p>{item.split(";")[2]}
                  {
          langContext.language === "cz" && ". generace"
        }
        {
          langContext.language === "en" && ". generation"
        }</p>
                </div>
                <button name={item} onClick={(event)=>{removeFavorite(event, setFav)}} className={styles.nofavoritebutton} type="button">
                {
          langContext.language === "cz" && "Odebrat"
        }
        {
          langContext.language === "en" && "Remove"
        }
                </button>
              </div>
          })
        }
        </div>
      </main>
    </div>
  )
}

export default Page