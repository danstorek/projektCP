import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, {useEffect, useState } from 'react';
import Link from 'next/link';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "../components/firebaseconnect";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import {darkMode, darkModeUseEffect, isLogged} from "../components/functions"

type Errors = {
  email?: any;
  password?: any;
};

if (isLogged()) {
  firebase.auth().signOut();
}

const Page = () => {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(styles.ok);
  const [submitting, setSubmitting] = useState(false);

  const [dark, setDark] = useState(styles.mainwhite);
  darkModeUseEffect(setDark);

  return (
    <div className={styles.container}>
      <Head>
        <title>Přihlášení</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <main className={dark}>
      <button className={styles.buttontoggle} onClick={() => {setDark(darkMode());}}>Dark Mode</button>
        <h1 className={styles.title}>
          Přihlášení
        </h1><br></br>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors:Errors = {};
            setMsg("");
            //Email errors
            if (!values.email) {
              errors.email = <p className={styles.error}>Vyžadovaná položka</p>;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = <p className={styles.error}>Neplatný email</p>;
            }

            //Password errors
            if (!values.password) {
              errors.password = <p className={styles.error}>Vyžadovaná položka</p>;
            }

            return errors;
          }}
          onSubmit={(values) => {
            setTimeout(() => {
              firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                  // Signed in
                  console.log("Přihlášen");
                  setMsg("Byl jsi úspěšně přihlášen");
                  setSubmitting(true);
                  setError(styles.ok);
                  // ...
                })
                .catch(() => {
                  setMsg("Vyskytla se chyba. Zkontroluj prosím své údaje.");
                  setError(styles.error);
                });
            }, 400);
          }}
        >
          {() => (
            <Form>
              <h2 className={styles.title2}>Email</h2>
              <Field disabled={submitting} type="email" name="email" />
              <ErrorMessage name="email" component="div"/>
              <h2 className={styles.title2}>Heslo</h2>
              <Field disabled={submitting} type="password" name="password" />
              <ErrorMessage name="password" component="div"/><br/>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                Přihlásit se
          </button>
              <Link href="./register"><button type="submit" className="btn btn-primary">
                Zaregistrovat se
          </button></Link>
            </Form>
          )}
        </Formik>
        <p className={error}>{msg}</p>
        <Link href="./main">Přejít na hlavní stránku</Link>
      </main>
    </div>
  )
}

export default Page;