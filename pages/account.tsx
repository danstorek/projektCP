import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import firebase from "../components/firebaseconnect";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import {isLogged, getDarkMode, useDarkMode} from "../components/functions";

import languageContext from "../components/language";

type Errors = {
  username?: any;
};

const About = () => {
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  if (isLogged()) {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid).get().then(doc => {
      setUsername((doc.data()||"")['username']);
    });
  }

  const langContext = useContext(languageContext);

  const [dark, setDark] = useState(styles.mainwhite);
  useDarkMode(setDark);

  return (
    <div className={styles.container}>
      <Head>
        <title>Account settings</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <Menu />
      <main className={dark}>
        <button className={styles.buttontoggle} onClick={() => {setDark(getDarkMode());}}>Dark Mode</button>
        <h1 className={"display-1 " + styles.title}>
        {
          langContext.language === "cz" && "Nastavení účtu "+username
        }
        {
          langContext.language === "en" && "Account settings of "+username
        }
        </h1>
        <h2 style={{ marginTop: "50px" }}>
        {
          langContext.language === "cz" && "Změna uživatelského jméno"
        }
        {
          langContext.language === "en" && "Edit nickname"
        }
        </h2>

        <Formik
          initialValues={{ username: '' }}
          validate={values => {
            const errors: Errors = {};

            //username errors
            if (!values.username) {
              errors.username = <p className={styles.error}>
                {
          langContext.language === "cz" && "Vyžadováná položka"
        }
        {
          langContext.language === "en" && "Required item"
        }
              </p>;
            } else if (
              !/^[a-z0-9_-]{3,15}$/i.test(values.username)
            ) {
              errors.username = <p className={styles.error}>
                {
          langContext.language === "cz" && "Neplatné uživatelské jméno"
        }
        {
          langContext.language === "en" && "Bad username"
        }
              </p>;
            }
            console.log(errors);
            return errors;
          }}
          onSubmit={(values) => {
            setTimeout(() => {
              const db = firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid);
              return db.update({
                username: values.username
              })
                .then(() => {
                  if(langContext.language==="cz")setMsg("Uživatelské jméno bylo úspěšně změněno.");
                  if(langContext.language==="en")setMsg("Username was successfully edited.");
                  setUsername(values.username);
                })
                .catch(() => {
                  setMsg("error");
                })
            }, 400);
          }}
        >
          {() => (
            <Form>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" /><br></br>
              <button type="submit" className="btn btn-primary">
              {
          langContext.language === "cz" && "Uložit uživatelské jméno"
        }
        {
          langContext.language === "en" && "Save nickname"
        }
          </button>
            </Form>
          )}
        </Formik>
        <p className={styles.ok}>{msg}</p>

      </main>
    </div>
  )
}
export default About
