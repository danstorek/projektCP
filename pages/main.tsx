import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { useContext, useState } from 'react';
import { Image } from 'react-bootstrap';
import Popup from 'reactjs-popup';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import {setFavorite, getDarkMode, getPokeList, searchChange, useDarkMode} from "../components/functions"

import languageContext from "../components/language";

type V2Gen = {
  generation_id: number;
}

type Item = {
  name: string;
  id: number;
  pokemon_v2_pokemonspecy: V2Gen;
  weight: number;
  height: number;
  base_experience: number;
};

const Page = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");

  const [dark, setDark] = useState(styles.mainwhite);

  const langContext = useContext(languageContext);
  useDarkMode(setDark);

  getPokeList(setData, setLoad);

  return (
    <div className={styles.container}>
      <Head>
        <title>Main page</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <Menu />
      <main className={dark}>
        <button className={styles.buttontoggle} onClick={() => {setDark(getDarkMode());}}>Dark Mode</button>
        <h1 className={"display-1 " + styles.title}>
        {
          langContext.language === "cz" && "Seznam všech pokémonů"
        }
        {
          langContext.language === "en" && "List of all pokemons"
        }
        </h1>
        <input className={styles.search} onChange={(event)=>searchChange(event, setSearch)} placeholder="Vyhledávání" />
        <div className={styles.flexdiv}>
          {load &&
            data.map((item: Item, key) => {
              if (item.name.startsWith(search))
                return <Popup
                trigger={<div key={key} className={styles.flexcontainer + " " + styles.pokecard}>
                <Image src={"./" + item.name + ".png"} width="73%" />
                <div className={styles.pokecontainer}>
                  <h4><b>{item.name[0].toUpperCase() + item.name.substring(1)}</b></h4>
                  <p>{item.pokemon_v2_pokemonspecy.generation_id}
                  {
          langContext.language === "cz" && ". generace"
        }
        {
          langContext.language === "en" && ". generation"
        }</p>
                </div>
              </div>}
                modal
                nested
              >
                {close => (
                  <div className={styles.modal}>
                    <button className={styles.close} onClick={close}>
                      X
                    </button>
                    <div className={styles.header}> <Image src={"./" + item.name + ".png"} width="128px" />{item.name[0].toUpperCase() + item.name.substring(1)}  </div>
                    <div className={styles.content}>
                      {' '}
                      <strong>{
          langContext.language === "cz" && "Generace: "
        }
        {
          langContext.language === "en" && "Generation: "
        }</strong> {item.pokemon_v2_pokemonspecy.generation_id}
                      <br /><br />
                      <strong>
                        {
          langContext.language === "cz" && "Zkušenosti: "
        }
        {
          langContext.language === "en" && "Experience: "
        }</strong> {item.base_experience} 
                      <br /><br />
                      <strong>{
          langContext.language === "cz" && "Váha: "
        }
        {
          langContext.language === "en" && "Weight: "
        }</strong> {item.weight / 10} kg
                      <br />
                      <strong>{
          langContext.language === "cz" && "Výška: "
        }
        {
          langContext.language === "en" && "Height: "
        }</strong> {item.height * 10} cm
                      <br /><br />
                      <button id={item.name + ";" + item.id + ";" + item.pokemon_v2_pokemonspecy.generation_id} className={styles.nofavoritebutton} onClick={setFavorite} type="button">
                      {
          langContext.language === "cz" && "Oblíbený"
        }
        {
          langContext.language === "en" && "Favorite"
        }
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            })
          }
          {!load &&
            <p>
              {
          langContext.language === "cz" && "Načítání..."
        }
        {
          langContext.language === "en" && "Loading..."
        }
            </p>
          }
        </div>
      </main>
    </div>
  )
}

export default Page