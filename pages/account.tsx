import { Menu } from '../components/menu';
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import firebase from "../components/firebaseconnect";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import {isLogged, darkMode, darkModeUseEffect} from "../components/functions";

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
        <h1 className={"display-1 " + styles.title}>Nastavení účtu {username}</h1>
        <h2 style={{ marginTop: "50px" }}>Změna username</h2>

        <Formik
          initialValues={{ username: '' }}
          validate={values => {
            const errors: Errors = {};

            //username errors
            if (!values.username) {
              errors.username = <p className={styles.error}>Vyžadovaná položka</p>;
            } else if (
              !/^[a-z0-9_-]{3,15}$/i.test(values.username)
            ) {
              errors.username = <p className={styles.error}>Neplatný username</p>;
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
                  setMsg("Username byl úspěšně změněn.");
                  setUsername(values.username);
                })
                .catch(() => {
                  setMsg("Vyskytla se chyba.");
                })
            }, 400);
          }}
        >
          {() => (
            <Form>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" /><br></br>
              <button type="submit" className="btn btn-primary">
                Změnit jméno
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
