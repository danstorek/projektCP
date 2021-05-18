import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import Popup from 'reactjs-popup';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import {favorite, darkMode, getPokeList, searchChange, darkModeUseEffect} from "../components/functions"

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

const Page = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");

  const [dark, setDark] = useState(styles.mainwhite);
  darkModeUseEffect(setDark);

  getPokeList(setData, setLoad);

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
          Seznam všech pokémonů
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
                  <p>{item.pokemon_v2_pokemonspecy.generation_id}. generace</p>
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
                      <strong>Generace: </strong> {item.pokemon_v2_pokemonspecy.generation_id}
                      <br /><br />
                      <strong>Zkušenosti: </strong> {item.base_experience} 
                      <br /><br />
                      <strong>Váha: </strong> {item.weight / 10} kg
                      <br />
                      <strong>Výška: </strong> {item.height * 10} cm
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