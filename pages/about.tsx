import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import {darkMode, darkModeUseEffect} from "../components/functions"

const About = () => {

  const [dark, setDark] = useState(styles.mainwhite);
  darkModeUseEffect(setDark);

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
      <h1 className={"display-1 "+styles.title}>O nás</h1>
      <h2 style={{marginTop:"50px"}}>Klikněte<Link href="/main"><a> zde </a></Link>pro přesměrování na hlavní stránku.</h2>
      </main>
    </div>
  )
}

export default About
