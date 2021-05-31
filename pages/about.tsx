import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useState } from 'react';

import { getDarkMode, getLanguageText, useDarkMode } from "../components/functions"

import languageContext from "../components/language"

const About = () => {

  const langContext = useContext(languageContext);
  console.log(langContext.language);
  const [dark, setDark] = useState(styles.mainwhite);
  useDarkMode(setDark);

  const lng = getLanguageText(langContext.language);

  return (
    <div className={styles.container}>
      <Head>
        <title>{lng?.['app.about']}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <Menu />
      <main className={dark}>
        <button className={styles.buttontoggle} onClick={() => { setDark(getDarkMode()); }}>Dark Mode</button>
        <h1 className={"display-1 " + styles.title}>{lng?.['app.about']}</h1>
        <h2 style={{ marginTop: "50px" }}><Link href="/main"><a>{lng?.['app.clickheretogetback']}</a></Link></h2>
      </main>
    </div>
  )
}

export default About
