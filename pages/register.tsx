import styles from '../styles/Home.module.css'
import Head from 'next/head';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "../components/firebaseconnect";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import React, { useEffect, useState } from 'react';

import {darkMode, darkModeUseEffect} from "../components/functions";

type Errors = {
  username?: any;
  email?: any;
  password?: any;
  password2?: any;
};

const Page = () => {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(styles.ok);
  const [submitting, setSubmitting] = useState(false);

  const [dark, setDark] = useState(styles.mainwhite);
  darkModeUseEffect(setDark);

  return (
    <div className={styles.container}>
      <Head>
        <title>Registrace</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <main className={dark}>
        <button className={styles.buttontoggle} onClick={() => {setDark(darkMode());}}>Dark Mode</button>
        <h1 className={styles.title}>
          Registrace
        </h1><br></br>
        <Formik
          initialValues={{ email: '', password: '', password2: '', username: ''}}
          validate={values => {
            const errors:Errors = {};

            //username errors
            if (!values.username) {
              errors.username = <p className={styles.error}>Vyžadovaná položka</p>;
            } else if (
              !/^[a-z0-9_-]{3,15}$/i.test(values.username)
            ) {
              errors.username = <p className={styles.error}>Neplatný username</p>;
            }

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
            else if (values.password.length > 15) {
              errors.password = <p className={styles.error}>Heslo musí mít méně než 15 znaků</p>;
            }
            else if (values.password.length < 6) {
              errors.password = <p className={styles.error}>Heslo musí mít více než 6 znaků</p>;
            }

            //Password2 errors
            if (!values.password2) {
              errors.password2 = <p className={styles.error}>Vyžadovaná položka</p>;
            }
            else if (values.password != values.password2) {
              errors.password2 = <p className={styles.error}>Hesla se neshodují</p>;
            }

            console.log(errors);
            return errors;

          }}
          onSubmit={(values) => {
            setTimeout(() => {
              firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
                .then((userCredential) => {
                  // Signed in 
                  var user = userCredential.user;
                  firebase.firestore().collection("users").doc(user?.uid).set({
                    username: values.username,
                    favorite: [],
                  });
                  setSubmitting(true);
                  setMsg("Byl jsi úspěšně zaregistrován.");
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
              <h2 className={styles.title2}>Username</h2>
              <Field disabled={submitting} type="text" name="username" />
              <ErrorMessage name="username" component="div" />
              <h2 className={styles.title2}>Email</h2>
              <Field disabled={submitting} type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <h2 className={styles.title2}>Heslo</h2>
              <Field disabled={submitting} type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <h2 className={styles.title2}>Heslo pro ověření</h2>
              <Field disabled={submitting} type="password" name="password2" />
              <ErrorMessage name="password2" component="div" /><br></br>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                Zaregistrovat se
          </button>
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